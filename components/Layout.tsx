import React from 'react';
import Footer from './Footer';
import MyModal from './MyModal';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <MyModal />
    </>
  );
};

export default Layout;
