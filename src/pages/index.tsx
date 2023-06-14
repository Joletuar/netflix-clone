import { Billboard, Navbar } from '@/components';
import { useCurrentUser } from '@/hooks';

const Home = () => {
  const { user, isError, isLoading } = useCurrentUser();

  return (
    <>
      <Navbar />

      <Billboard />
    </>
  );
};

export default Home;
