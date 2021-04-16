import { Wrapper } from '@/styles/components/DefaultLayout';
import { ReactElement } from 'react';
import Header from './Header';

interface DefaultChildren {
  children: ReactElement;
}

const DefaultLayout = ({ children }: DefaultChildren) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

export default DefaultLayout;
