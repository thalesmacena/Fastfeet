import Header from '@/components/Header';
import { ReactElement } from 'react';
import { Content, Wrapper } from './styles';

interface DefaultChildren {
  children: ReactElement;
}

const DefaultLayout = ({ children }: DefaultChildren) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default DefaultLayout;
