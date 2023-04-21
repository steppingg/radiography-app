import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues, SubmitHandler } from 'react-hook-form/dist/types';
import { MdDataUsage, MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md';

interface IForm {
  email: string;
  password: string;
}

const LoginPage = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    const res = await signIn('credentials', {
      ...data,
      csrfToken,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/');
      setLoading(false);
    }

    setError('root', { type: 'validate', message: res?.error });
    setLoading(false);
  };

  console.log(errors);

  return (
    <div className="h-screen flex">
      <div className="px-4 w-1/2 hidden sm:flex bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">Radiography</h1>
          <p className="text-white mt-1 text-xl">Прозорість, якій можна довіряти: Рентгенографія.</p>
        </div>
      </div>

      <div className="flex w-full sm:w-1/2 justify-center items-center bg-white">
        <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Привіт!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">З поверненням!</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <MdOutlineAlternateEmail className="text-gray-400" />

            <input className="pl-2 w-full outline-none border-none" type="email" autoComplete="email" placeholder="Email" {...register('email', { required: true })} />
            {errors.email ? <p className="text-red-500">{String(errors.email)}</p> : null}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <MdLockOutline className="text-gray-400" />

            <input className="pl-2 w-full outline-none border-none" type="password" autoComplete="password" placeholder="•••••••••" {...register('password', { required: true })} />

            {errors.password ? <p className="text-red-500">{String(errors.password)}</p> : null}
          </div>

          {errors.root ? <p className="text-red-500">Невірний Email, або пароль!</p> : null}
          <button type="submit" className="flex justify-center items-center w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold">
            {loading ? <MdDataUsage className="animate-spin h-6" /> : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default LoginPage;
