import { useCurrentUser } from '@/hooks';
import { signOut } from 'next-auth/react';

const Home = () => {
  const { user, isError, isLoading } = useCurrentUser();

  if (isLoading) return <>Loading..</>;

  return (
    <>
      <h1 className='text-4xl text-green-500'>Home</h1>

      <p>{user.name}</p>

      <button className='h-10 w-full bg-white' onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
};

export default Home;
