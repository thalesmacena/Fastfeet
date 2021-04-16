import { LoadingSpin } from '@/components/LoadingSpin';
import { ThemeContext } from '@/contexts/ThemeContext';
import useUser from '@/lib/useUser';
import { Container } from '@/styles/pages/Home';
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
        <LoadingSpin color="white" spinWidth={3} />
      </>
    </Container>
  );
};

export default Home;
