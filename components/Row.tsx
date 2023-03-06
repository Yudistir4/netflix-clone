import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image';
import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typing';

interface Props {
    title: string;
    movies: Movie[]
}

const Row = ({ title, movies }: Props) => {

    const [modal, setModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)

    const rowRef = useRef<HTMLDivElement>(null)

    const handleClick = (direction: string) => {

        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current

            const scroll = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
            rowRef.current.scrollTo({ left: scroll, behavior: 'smooth' })

        }
    }

    return (
        <div className="px-3" >
            <h2 className="font-semibold">{title}</h2>
            <div className="flex items-center">
                <ChevronLeftIcon onClick={() => handleClick("left")} className='h-6  absolute left-5 z-10 hover:scale-125 transition-all cursor-pointer   ' />

                <div ref={rowRef} className="flex items-center gap-3 py-3 scrollbar-hide overflow-scroll">
                    {movies.map(movie =>
                        <div
                            key={movie?.id}
                            onClick={() => {
                                setMovie(movie);
                                setModal(true);
                            }}
                            className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
                                    }`}
                                className="rounded-sm object-cover md:rounded"
                                layout="fill"
                            />
                        </div>
                    )}
                </div>
                <ChevronRightIcon onClick={() => handleClick("right")} className='h-6 absolute right-5 z-10 hover:scale-125 transition-all cursor-pointer ' />
            </div >

        </div >
    )
}

export default Row