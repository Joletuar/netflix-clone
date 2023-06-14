import { Navbar } from '@/components';
import { useCurrentUser } from '@/hooks';

const Home = () => {
  const { user, isError, isLoading } = useCurrentUser();

  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
