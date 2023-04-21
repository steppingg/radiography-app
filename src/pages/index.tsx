import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const { status, data } = useSession();
  const router = useRouter();

  console.log(status, data);

  const handleLogout = async () => await signOut({ redirect: false });

  React.useEffect(() => {
    // if (status === 'authenticated') {
    //   switch (data?.user?.role) {
    //     case 'admin':
    //       router.push('/admin');
    //       break;

    //     case 'nurse':
    //       router.push('/nurse');
    //       break;

    //     case 'doctor':
    //       router.push('/doctor');
    //       break;
    //   }
    // }
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

  return (
    <div>
      <div>{status}</div>
      <div>{JSON.stringify(data)}</div>

      {status === 'authenticated' && <button onClick={handleLogout}>Logout</button>}
      {status === 'unauthenticated' && <Link href="/login">Login</Link>}
    </div>
  );
}
