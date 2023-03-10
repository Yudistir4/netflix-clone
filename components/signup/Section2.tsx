import { Checkbox } from '@chakra-ui/react';
import { sign } from 'crypto';
import { MotionConfig } from 'framer-motion';
import React from 'react';
import { signup } from '../../constants/staticText';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
interface Props {
  setSection: () => void;
  setData: (
    value: React.SetStateAction<{
      email: string;
      password: string;
    }>
  ) => void;
}

type FormData = {
  email: string;
  password: string;
};
const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type Field = {
  name: 'email' | 'password';
  placeholder: string;
  type: string;
};

const fields: Field[] = [
  { placeholder: 'Email', name: 'email', type: 'email' },
  { placeholder: 'Add a password', name: 'password', type: 'password' },
];

const Section2 = ({ setSection, setData }: Props) => {
  const { signUp, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: localStorage.getItem('email') || '', password: '' },
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setData(data);
    const errStatus = await signUp(data.email, data.password);

    if (!errStatus) {
      setSection();
    }
  });

  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md flex flex-col items-center   gap-5 mx-4"
    >
      <div>
        <p className="text-xs pb-2">
          STEP <span className="font-bold">1</span> OF{' '}
          <span className="font-bold">3</span>{' '}
        </p>
        <h2 className="text-3xl font-semibold">{signup.section2.title} </h2>
      </div>
      <p className="w-full">
        {signup.section2.p1} <br /> {signup.section2.p2}
      </p>
      <div className="flex flex-col gap-3 w-full">
        {fields.map((val: Field, i) => (
          <div key={i} className="">
            <input {...register(val.name)} {...val} className="input " />
            {errors[val.name] && (
              <p className="text-sm text-red-500">
                {errors[val.name]!.message}
              </p>
            )}
          </div>
        ))}
        {error && (
          <p className="text-sm text-center bg-red-500/20 rounded p-3 text-red-500">
            {error}
          </p>
        )}

        <Checkbox size="lg"> {signup.section2.checkBox}</Checkbox>
        <button
          onClick={() => {
            onSubmit();
          }}
          className="w-full bg-red-netflix py-3 rounded-md font-semibold text-xl flex items-center justify-center"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          ) : (
            signup.section0.button
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Section2;
