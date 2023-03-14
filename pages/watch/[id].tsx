import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HandThumbUpIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../atoms/atom';
import { useRequireAuth } from '../../hooks/useAuth';
import { Element, Genre } from '../../typing';

const Watch = () => {
  useRequireAuth();
  const router = useRouter();
  const { id } = router.query;
  const [muted, setMuted] = useState(false);
  const [movie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [showInputRange, setShowInputRange] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setMuted(false);
    console.log(e.target.value);
    if (e.target.value === '0') {
      setMuted(true);
    }
  };

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
          <button className="group-hover:opacity-100 opacity-0 transition-all group-hover:scale-100 scale-0 rounded-full border-2 border-[gray] bg-black/50 h-16 w-16 flex items-center justify-center hover:bg-white/20 hover:border-white">
            {' '}
            <PlusIcon className="h-8 w-8" />{' '}
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
