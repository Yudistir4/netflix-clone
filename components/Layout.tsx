import React from 'react';
import MyModal from './MyModal';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <MyModal />
    </>
  );
};

export default Layout;
