import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.textInput};
  font: 700 3rem 'Inter', sans-serif;

  img {
    width: 50rem;
  }

  @media (max-width: 1080px) {
    img {
      width: 40rem;
    }
  }

  @media (max-width: 720px) {
    img {
      width: 30rem;
    }
  }
`;
