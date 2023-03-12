import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRecoilState } from 'recoil';
// import { modalState } from "../../atoms/modalAtom"
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie } from '../typing';
import { baseUrl } from '../constants';
import Link from 'next/link';

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [currMovie, setCurrMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setCurrMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);
  console.log(netflixOriginals);
  return (
    <div className=" p-3 sm:px-10 mb-20">
      <div className="bg-gradient-to-b w-full h-[60vh] sm:h-[95vh] absolute left-0 top-0 -z-10"></div>

      <div className=" absolute left-0 top-0 -z-20 w-full h-[60vh] sm:h-[95vh]">
        <Image
          src={`${baseUrl}${
            currMovie?.backdrop_path || currMovie?.poster_path
          }`}
          className=""
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-4 mt-10">
        <h1 className="text-2xl md:text-6xl font-semibold">
          {currMovie?.title || currMovie?.name || movie?.original_name}
        </h1>
        <p className="md:text-xl text-xs max-w-[80%] md:max-w-xl">
          {currMovie?.overview}
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
            {/* <button className=" bg-white text-black"> */}
            More Info
            <InformationCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
