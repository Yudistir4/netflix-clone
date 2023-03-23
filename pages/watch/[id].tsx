import { HandThumbUpIcon, PlusIcon } from '@heroicons/react/24/solid';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs';
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import {
  movieState,
  muteState,
  myMoviesState,
  volumeState,
} from '../../atoms/atom';
import { db } from '../../firebase';
import useAuth, { useRequireAuth } from '../../hooks/useAuth';
import { Element, Genre, myMovieFirebase } from '../../typing';

const Watch = () => {
  useRequireAuth();
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [muted, setMuted] = useRecoilState(muteState);
  const [movie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useRecoilState(volumeState);
  const [showInputRange, setShowInputRange] = useState(false);
  const [movieIdFirebase, setMovieIdFirebase] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [myMovies, setMyMovies] = useRecoilState(myMoviesState);

  const deleteMovie = async () => {
    if (!movieIdFirebase) return;
    const docRef = doc(db, 'movies', movieIdFirebase);

    deleteDoc(docRef)
      .then(() => {
        console.log('Document successfully deleted!');
        setIsSaved(false);
        setMovieIdFirebase('');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });

    setMyMovies(
      myMovies?.filter((data: myMovieFirebase) => data.movie?.id !== movie?.id)
    );
  };

  const addMovie = async () => {
    // Add a second document with a generated ID.

    try {
      const newMovie: myMovieFirebase = {
        userID: user!.uid,
        movie,
      };
      const docRef = await addDoc(collection(db, 'movies'), newMovie);
      setMovieIdFirebase(docRef.id);
      setIsSaved(true);
      setMyMovies((prev) => [...prev, newMovie]);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setMuted(false);

    if (e.target.value === '0') {
      setMuted(true);
    }
  };
  useEffect(() => {
    if (!movie) return;
    const getData = async () => {
      const movieRef = collection(db, 'movies');
      const q = query(
        movieRef,
        where('movie.id', '==', movie!.id),
        where('userID', '==', user?.uid || '')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        console.log(doc.id, ' => ', doc.data());
        setIsSaved(true);
        setMovieIdFirebase(doc.id);
      });

      console.log(querySnapshot.empty);
      if (querySnapshot.empty) {
        setIsSaved(false);
      }
    };
    getData();
  }, [movie, user]);

  useEffect(() => {
    // if (!movie) return;
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        );
        setTrailer(data.videos?.results[index]?.key);
      } else {
        setTrailer('');
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    };

    fetchMovie();
  }, [id, movie]);

  return (
    <div className="group bg-[#181818] h-screen  text-white !p-0 !rounded overflow-hidden">
      {/* <div className="h-screen "> */}
      <div className="relative  h-screen">
        {!trailer ? (
          <div className=" w-full text-center h-full absolute justify-center  flex items-center  ">
            Video Not Available...!!
          </div>
        ) : (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            playing={playing}
            controls={false}
            volume={volume}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            muted={muted}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  modestbranding: 1,
                },
              },
            }}
          />
        )}

        <button
          onClick={() => router.back()}
          className="group-hover:opacity-100 opacity-0 transition-all group-hover:scale-100 scale-0 rounded-full   absolute md:top-8 md:left-8 top-5 left-5 h-10 w-10 flex items-center justify-center "
        >
          <BsArrowLeft className="h-20 w-20" />
        </button>
      </div>
      {/* </div> */}
      <div className=" absolute flex   bottom-0 left-0 p-5 md:p-8 justify-between w-full">
        <div className="flex gap-2">
          <button
            onClick={() => setPlaying((prev) => !prev)}
            className="group-hover:opacity-100 opacity-0 transition-all group-hover:scale-100 scale-0 rounded-full border-2 border-[gray] bg-black/50 h-16 w-16 flex items-center justify-center hover:bg-white/20 hover:border-white"
          >
            {playing ? (
              <FaPause className="h-8 w-8" />
            ) : (
              <FaPlay className="h-8 w-8" />
            )}
          </button>
          <button
            onClick={isSaved ? deleteMovie : addMovie}
            className="group-hover:opacity-100 opacity-0 transition-all group-hover:scale-100 scale-0 rounded-full border-2 border-[gray] bg-black/50 h-16 w-16 flex items-center justify-center hover:bg-white/20 hover:border-white"
          >
            {isSaved ? (
              <BsCheck2 className="h-8 w-8" />
            ) : (
              <PlusIcon className="h-8 w-8" />
            )}
            {/* <PlusIcon className="h-8 w-8" />{' '} */}
          </button>
          <button className="group-hover:opacity-100 opacity-0 transition-all group-hover:scale-100 scale-0 rounded-full border-2 border-[gray] bg-black/50 h-16 w-16 flex items-center justify-center hover:bg-white/20 hover:border-white">
            {' '}
            <HandThumbUpIcon className="h-8 w-8" />{' '}
          </button>
        </div>
        <div
          className="group/edit relative"
          onMouseEnter={() => setShowInputRange(true)}
          onMouseLeave={() => setShowInputRange(false)}
        >
          <button
            onClick={() => setMuted((prev) => !prev)}
            className=" group-hover:opacity-100 opacity-0 transition-all group-hover:scale-100 scale-0 rounded-full border-2 border-[gray] bg-black/50 h-16 w-16 flex items-center justify-center hover:bg-white/20 hover:border-white"
          >
            {muted ? (
              <FaVolumeMute className="h-8 w-8" />
            ) : (
              <FaVolumeUp className="h-8 w-8" />
            )}{' '}
          </button>
          {showInputRange && (
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              className=" -rotate-90 absolute cursor-pointer  -top-[69px] bottom- translate-x-[50%]   right-[50%]   appearance-none  h-2 rounded-full  outline-none   "
              onChange={handleVolumeChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Watch;
