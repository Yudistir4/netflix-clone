import React, { ReactElement, useEffect, useState } from 'react';
import LayoutSignup from '../../components/LayoutSignup';
import useAuth, { useRequireWithAuthAndNoSubscribe } from '../../hooks/useAuth';
import { signup } from '../../constants/staticText';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
const Signup = () => {
  useRequireWithAuthAndNoSubscribe();
  const { user, userDetail, updateUserDetail } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  const submit = async () => {
    if (!user) return;

    await updateUserDetail({
      id: userDetail!.id,
      userID: userDetail!.userID,
      hasPaid: true,
      planType: userDetail!.planType,
      signupSlideNumber: 5,
    });
  };

  useEffect(() => {
    if (!showCountdown) return;
    let intervalId: number;
    intervalId = window.setInterval(async () => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      } else {
        clearInterval(intervalId);
        await submit();
        // navigate to the next page or reset the form, etc.
        router.push('/browse');
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdown, showCountdown, router]);
  return (
    <>
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="m-5 max-w-md w-full flex flex-col items-center text-center gap-5"
      >
        <Image height={50} width={50} src="/assets/lock.png" alt="lock" />
        <div className="mt-5">
          <p className="text-xs pb-2">
            STEP <span className="font-bold">3</span> OF{' '}
            <span className="font-bold">3</span>{' '}
          </p>
          <h2 className="text-3xl font-semibold">{signup.section5.title} </h2>
        </div>
        <p>{signup.section5.p1}</p>
        <p className="font font-semibold">
          {signup.section5.p2[1]} <br />
          {signup.section5.p2[2]}
        </p>
        <div className="text-left flex gap-2 flex-col w-full">
          {signup.section5.payments.map((val) => (
            <button
              onClick={() => {
                onOpen();
                setShowCountdown(true);
              }}
              key={val.text}
              className="flex  gap-2 text-lg items-center border-2 border-[gray]  rounded px-3 py-2 justify-between"
            >
              <div className="flex gap-2 items-center">
                <span className="mr-2">{val.text}</span>
                {val.images.map((img) => (
                  <Image key={img} height={40} width={40} src={img} alt={img} />
                ))}
              </div>
              <ChevronRightIcon className="h-7 text-[gray]" />
            </button>
          ))}
        </div>
      </motion.div>
      <Modal
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onOpen}
        isCentered
        size="sm"
        // scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent className="m-5 sm:m-10">
          <ModalBody overflowY="auto" className="bg-[#181818] text-white      ">
            <div className="p-10   flex flex-col items-center gap-5 w-full">
              <AiOutlineCheckCircle className="  text-7xl" />
              <h2 className="   text-2xl font-bold">Payment Successful!</h2>

              {showCountdown && (
                <div className="m-auto">
                  Redirecting in {countdown} seconds...
                </div>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Signup;
Signup.getLayout = function getLayout(page: ReactElement) {
  return <LayoutSignup>{page}</LayoutSignup>;
};
