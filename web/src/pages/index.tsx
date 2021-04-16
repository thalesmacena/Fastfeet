import { ThemeContext } from '@/contexts/ThemeContext';
import useUser from '@/lib/useUser';
import { Container, LoadingCircle } from '@/styles/pages/Home';
import { useContext } from 'react';

const Home = () => {
  const { theme } = useContext(ThemeContext);

  useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true
  });

  useUser({ redirectTo: '/signin' });

  return (
    <Container>
      <>
        {theme === 'light' ? (
          <img src="logo-dark@2x.svg" alt="Fastfeet" />
        ) : (
          <img src="logo-light@2x.svg" alt="Fastfeet" />
        )}
        <LoadingCircle color="white" />
      </>
    </Container>
  );
};

export default Home;
