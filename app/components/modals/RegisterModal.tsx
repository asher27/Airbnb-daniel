'use client';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Modal from '@/app/components/modals/Modal';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import toast from 'react-hot-toast';
import Button from '@/app/components/Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post(`/api/register`, data)
      .then(() => {
        toast.success('Success!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        // console.log(error);
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className={'flex flex-col gap-4'}>
      <Heading title={'Welcome to Airbnb'} subtitle={'Create an account!'} />
      <Input
        id={'email'}
        label={'Email'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
      />
      <Input
        id={'name'}
        label={'Name'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
      />
      <Input
        id={'password'}
        type={'password'}
        label={'Password'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
      />
    </div>
  );

  const footerContent = (
    <div className={'flex flex-col gap-4 mt-3'}>
      <hr />
      <Button
        label={'Continue with Google'}
        onClick={() => signIn('google')}
        outline={true}
        icon={FcGoogle}
      />
      <Button
        label={'Continue with Github'}
        onClick={() => signIn('github')}
        outline={true}
        icon={AiFillGithub}
      />
      <div
        className={`
            text-neutral-500
            text-center
            mt-4
            font-light
            `}
      >
        <div className={'flex items-center gap-2 justify-center'}>
          <div>Already have an account?</div>
          <div onClick={onToggle} className={'text-neutral-800 cursor-pointer hover:underline'}>
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={'Register'}
      actionLabel={'Continue'}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
