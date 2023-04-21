import { useSession } from 'next-auth/react';
import React from 'react';

const NurseIndexPage = () => {
  const { status, data } = useSession();

  return <div>Welcome, {data?.user?.name}!</div>;
};

export default NurseIndexPage;
