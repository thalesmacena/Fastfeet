import useUser from '@/lib/useUser';

const Home = () => {
  useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true
  });

  useUser({ redirectTo: '/signin' });

  return <h1>Inicio</h1>;
};

export default Home;
