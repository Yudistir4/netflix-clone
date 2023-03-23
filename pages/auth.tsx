import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

const Auth = () => {
  return <div>Auth</div>;
};

interface MyQuery extends ParsedUrlQuery {
  oobCode: string;
  mode: string;
}

export default Auth;
export async function getServerSideProps(
  context: GetServerSidePropsContext<MyQuery>
) {
  const query = context.query as MyQuery;

  if (!query.mode || !query.oobCode)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  return {
    redirect: {
      destination: `/${query.mode}?mode=${query.mode}&oobCode=${query.oobCode}`,
      permanent: false,
    },
  };

  
}
