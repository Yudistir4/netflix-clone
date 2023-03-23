import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import {
  HandThumbUpIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import {
  modalState,
  movieState,
  muteState,
  myMoviesState,
} from '../atoms/atom';
import { Element, Genre, myMovieFirebase } from '../typing';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { BsCheck2 } from 'react-icons/bs';

const MyModal = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [modal, setModal] = useRecoilState(modalState);
  const [muted, setMuted] = useRecoilState(muteState);
  const [movie] = useRecoilState(movieState);
  const [myMovies, setMyMovies] = useRecoilState(myMoviesState);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [movieIdFirebase, setMovieIdFirebase] = useState('');

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
    if (!movie) return;
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
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
  }, [movie]);

  return (
    <>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        // isCentered
        size="5xl"
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent className="m-5 sm:m-10">
          <ModalBody
            overflowY="auto"
            className="bg-[#181818] text-xl   text-white !p-0 !rounded overflow-hidden"
          >
            {!trailer && (
              <div className=" w-full text-center aspect-[2.5/1] absolute justify-center  flex items-center   ">
                Video Not Available...!!
              </div>
            )}
            <div className="relative pt-[56.25%]  ">
              <div className=" w-full bg-gradient-to-t from-[#181818] to-transparent h-[40%]  absolute left-0 bottom-0 z-10"></div>
              {trailer && (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  width="100%"
                  height="100%"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  playing
                  loop
                  muted={muted}
                />
              )}

              <button
                onClick={() => setModal(false)}
                className="rounded-full z-20 bg-[#181818] absolute top-3 right-3 h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center "
              >
                <XMarkIcon className="h-5 w-5 sm:h-8 sm:w-8" />
              </button>
              <div className="z-10 absolute left-0 bottom-11 xs:bottom-14 sm:bottom-[60px] sm:p-10 md:text-5xl text-xl pl-5">
                {movie?.title || movie?.name || movie?.original_name}
              </div>

              {/* Control */}
              <div className="z-20 absolute flex    bottom-0 left-0 px-5 sm:p-10 justify-between items-center w-full">
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() => {
                      setModal(false);
                      router.push(`/watch/${movie?.id}`);
                    }}
                    className="cursor-pointer text-base xs:text-2xl bg-white text-black flex items-center justify-center rounded-md px-10 py-2 gap-2 font-bold   "
                  >
                    <FaPlay />
                    <span> Play</span>
                  </div>

                  <button
                    onClick={isSaved ? deleteMovie : addMovie}
                    className="rounded-full border-2 border-[gray] bg-black/50 h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center hover:bg-white/20 hover:border-white"
                  >
                    {isSaved ? (
                      <BsCheck2 className="h-6 w-6 sm:h-8 sm:w-8" />
                    ) : (
                      <PlusIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                    )}
                  </button>
                  <button className="rounded-full border-2 border-[gray] bg-black/50 h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center hover:bg-white/20 hover:border-white">
                    <HandThumbUpIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </button>
                </div>
                <button
                  onClick={() => setMuted((prev) => !prev)}
                  className="rounded-full border-2 border-[gray] bg-black/50 h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center hover:bg-white/20 hover:border-white"
                >
                  {muted ? (
                    <FaVolumeMute className="h-6 w-6 sm:h-8 sm:w-8" />
                  ) : (
                    <FaVolumeUp className="h-6 w-6 sm:h-8 sm:w-8" />
                  )}{' '}
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-10">
              <div className="flex mb-5 items-center gap-2">
                <p className="text-green-500 font-bold">
                  {Math.round(movie?.vote_average * 10)}% Match{' '}
                </p>
                <p className="font-thin">{movie?.release_date}</p>
                <p className="rounded border h-4 w-6 flex items-center justify-center text-xs">
                  HD
                </p>
              </div>
              <div className="flex flex-col xs:flex-row justify-between gap-5 text-justify">
                <p className="xs:w-[60%]">{movie?.overview}</p>
                <div className="flex flex-col gap-3 xs:w-[40%]">
                  <p>
                    <span className="text-[gray]">Genres: </span>
                    {genres.map((genre) => genre.name).join(', ')}
                  </p>
                  <p>
                    <span className="text-[gray]">Original Languange: </span>
                    {movie?.original_language}
                  </p>
                  <p>
                    <span className="text-[gray]">Total Votes: </span>
                    {movie?.vote_count}
                  </p>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MyModal;
