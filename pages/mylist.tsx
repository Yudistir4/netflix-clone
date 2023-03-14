import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import React, { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState, movieState, myMoviesState } from '../atoms/modalAtom';
import Layout from '../components/Layout';
import { db } from '../firebase';
import useAuth, { useRequireAuth } from '../hooks/useAuth';
import { myMovieFirebase } from '../typing';
import { NextPageWithLayout } from './_app';

const Mylist: NextPageWithLayout = () => {
  useRequireAuth();
  const { user } = useAuth();
  //  useState<data[] | null>();
  const [myMovies, setMyMovies] = useRecoilState(myMoviesState);
  const [modal, setModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);

  useEffect(() => {
    const getData = async () => {
      const movieRef = collection(db, 'movies');
      const q = query(movieRef, where('userID', '==', user?.uid));
      const querySnapshot = await getDocs(q);
      let movies: myMovieFirebase[] = [];
      querySnapshot.forEach((doc: any) => {
        movies.push(doc.data());
      });
      setMyMovies(movies);
    };
    getData();
  }, [user]);

  return (
    <div>
      <div className=" p-3 sm:p-10">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-10">My List</h2>
        <div
          //   ref={rowRef}
          className="grid  grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6   py-3 "
        >
          {myMovies &&
            myMovies.map((data: myMovieFirebase, i) => (
              <div
                // onMouseEnter={}
                key={data.movie?.id + i}
                onClick={() => {
                  setMovie(data.movie);
                  setModal(true);
                }}
                className="relative aspect-[50/28]    cursor-pointer transition duration-200 ease-out 
                md:hover:scale-105 "
              >
                {/* md:h-36 md:min-w-[260px] */}
                <Image
                  src={`https://image.tmdb.org/t/p/w500${
                    data.movie?.backdrop_path || data.movie?.poster_path
                  }`}
                  className="rounded-sm object-cover md:rounded"
                  layout="fill"
                  alt={data.movie?.name}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

Mylist.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Mylist;
