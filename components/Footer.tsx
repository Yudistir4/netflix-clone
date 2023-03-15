import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
const footerContent = [
  'Deskripsi Audio',
  'Pusat Bantuan',
  'Kartu Hadiah',
  'Pusat Media',
  'Hubungan Investor',
  'Lowongan Kerja',
  'Ketentuan Penggunaan',
  'Privasi',
  'Informasi Legal',
  'Preferensi Cookie',
  'Informasi Perusahaan',
  'Hubungi Kami',
];

const Footer = () => {
  return (
    <footer className="flex flex-col w-full p-10 gap-10 mt-20 xl:px-32">
      <div className="flex gap-5 text-4xl text-gray-200 ">
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </div>
      <div className="flex grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-300">
        {footerContent.map((data) => (
          <div key={data}>{data}</div>
        ))}
      </div>
      <div className="p-2 border-2 border-white w-fit text-gray-300">
        Kode Layanan
      </div>
    </footer>
  );
};

export default Footer;
