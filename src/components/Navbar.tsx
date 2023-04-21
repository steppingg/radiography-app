import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    router.push('/login');
    const res = await signOut();
  };

  return (
    <nav className="flex justify-between container mx-auto">
      <Link href="/">Radiography</Link>

      <div className="space-x-4">
        <Link href="/">Заявки</Link>
        <Link href="/">Мої описи</Link>
      </div>

      <button onClick={handleLogout} className="text-red-500 font-bold py-2 px-6 rounded-2xl">
        Вийти
      </button>
    </nav>
  );
};

export default Navbar;
