import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/Layout';

const DoctorIndexPage = () => {
  const { status, data } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');

      return;
    }
  }, [status]);

  return <Layout>Welcome, {data?.user?.name}!</Layout>;
};

export default DoctorIndexPage;
