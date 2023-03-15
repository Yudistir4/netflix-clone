import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRecoilState } from 'recoil';
// import { modalState } from "../../atoms/modalAtom"
import { modalState, movieState } from '../atoms/atom';
import { Movie } from '../typing';
import { baseUrl } from '../constants';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { Element } from '../typing';
import { cropText } from '../utils';

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [currMovie, setCurrMovie] = useState<Movie | null>(null);
  const [trailer, setTrailer] = useState('');
  useEffect(() => {
    if (!currMovie) return;
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          currMovie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${currMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        );
        console.log(data.videos);
        setTrailer(data.videos?.results[index]?.key);
      }
    };

    fetchMovie();
  }, [currMovie]);
  useEffect(() => {
    setCurrMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);
  // console.log(netflixOriginals);
  return (
    <div className="relative overflow-x-clip p-3 sm:px-10 aspect-[2/0.8] ">
      {/* <div className="bg-gradient-to-b w-full h-[60vh] sm:h-[95vh] absolute left-0 top-0 -z-10"></div> */}
      <div className="bg-gradient-to-b aspect-[16/10]  w-full scale-125 absolute left-0 top-0 -z-10"></div>

      <div className="left-0 top-0 -z-20 w-full h-[60vh] absolute ">
        <div className="pb-[56.25%] relative w-full mt-[-72px]    scale-125 -translate-x-[5%]">
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
            loop={true}
            muted={true}
            config={{
              youtube: {
                playerVars: {
                  cc_load_policy: 0, // Menonaktifkan subtitle
                },
              },
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 h-full w-full justify-center">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold">
          {currMovie?.title || currMovie?.name || movie?.original_name}
        </h1>
        <p className="md:text-xl text-xs max-w-[80%] md:max-w-xl">
          {cropText(currMovie?.overview)}
        </p>

        <div className="flex gap-3">
          <Link href={`/watch/${currMovie?.id}`}>
            <a className=" bg-white text-black sm:text-2xl sm:px-10 py-2 px-6 flex items-center gap-2 rounded-md font-semibold">
              <FaPlay />
              Play
            </a>
          </Link>
          <button
            onClick={() => {
              setShowModal(true);
              setMovie(currMovie);
            }}
            className=" bg-[gray]/75 sm:text-2xl sm:px-10  hover:opacity-80 transition py-2 px-6 flex items-center gap-2 rounded-md font-semibold"
          >
            More Info
            <InformationCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
