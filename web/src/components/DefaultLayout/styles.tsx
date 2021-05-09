import styled from 'styled-components';

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.backgroundDashboard};
  height: 100%;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 41px auto 0;

  h1 {
    display: block;
    margin-bottom: 2.5rem;

    font: 700 1.5rem Inter, sans-serif;
    color: ${({ theme }) => theme.colors.textInBackground};
  }
`;
