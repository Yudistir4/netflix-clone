import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';
import { searchMoviesState } from '../atoms/modalAtom';
import { Movie } from '../typing';

const SearchResult = () => {
  const [searchMovies] = useRecoilState(searchMoviesState);
  return (
    <div className=" p-3 sm:p-10">
      <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-10">Result</h2>
      <div
        //   ref={rowRef}
        className="grid  grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6   py-3 "
      >
        {searchMovies &&
          searchMovies.map((movie, i) => (
            <div
              // onMouseEnter={}
              key={movie?.id + i}
              //   onClick={() => {
              //     setMovie(movie);
              //     setModal(true);
              //   }}
              className="relative aspect-[50/28]    cursor-pointer transition duration-200 ease-out 
                md:hover:scale-105 "
            >
              {/* md:h-36 md:min-w-[260px] */}
              <Image
                src={`https://image.tmdb.org/t/p/w500${
                  movie?.backdrop_path || movie?.poster_path
                }`}
                className="rounded-sm object-cover md:rounded"
                layout="fill"
                alt={movie?.name}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchResult;
