import type { NextPage } from 'next';
import type { NextPageWithLayout } from './_app';
import Head from 'next/head';
import Banner from '../components/Banner';
import Row from '../components/Row';
import requests from '../services/config';
import { Movie } from '../typing';

import { useRequireAuth } from '../hooks/useAuth';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { searchState } from '../atoms/atom';
import Layout from '../components/Layout';
interface Props {
  koreans: Movie[];
  barats: Movie[];
  japans: Movie[];
  indians: Movie[];
  comedys: Movie[];
}

const Home: NextPageWithLayout<Props> = ({
  koreans,
  barats,
  japans,
  indians,
  comedys,
}) => {
  useRequireAuth();
  const router = useRouter();
  const [search] = useRecoilState(searchState);

  const movies = [
    { title: 'Tv Shows Korean', movies: koreans },
    { title: 'Tv Shows Barat', movies: barats },
    { title: 'Tv Shows Japan', movies: japans },
    { title: 'Tv Shows India', movies: indians },
    { title: 'Tv Shows Comedy', movies: comedys },
  ];

  // if (!user) {

  // }

  return (
    <div className=" relative">
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Banner netflixOriginals={koreans} />
        <section className="flex flex-col gap-5 sm:gap-8">
          {movies.map((val) => (
            <Row key={val.title} title={val.title} movies={val.movies} />
          ))}
        </section>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

export const getServerSideProps = async () => {
  const [koreans, barats, japans, indians, comedys] = await Promise.all([
    fetch(requests.fetchTvShowKorea).then((res) => res.json()),
    fetch(requests.fetchTvShowBarat).then((res) => res.json()),
    fetch(requests.fetchTvShowJapan).then((res) => res.json()),
    fetch(requests.fetchTvShowIndia).then((res) => res.json()),
    fetch(requests.fetchTvShowComedy).then((res) => res.json()),
  ]);

  return {
    props: {
      koreans: koreans.results,
      barats: barats.results,
      japans: japans.results,
      indians: indians.results,
      comedys: comedys.results,
    },
  };
};
