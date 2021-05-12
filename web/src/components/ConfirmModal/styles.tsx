import { darken } from 'polished';
import styled from 'styled-components';

export const OverlayModal = styled.div`
  background: ${({ theme }) => theme.backgroundModalOverlay};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

export const ConfirmModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  max-width: 25rem;
  padding: 2rem 3rem;
  border-radius: 5px;

  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.boxShadowModal};

  text-align: center;
  color: ${({ theme }) => theme.colors.textInBackground};

  strong {
    margin-bottom: 2rem;
    font: 700 1rem Inter, sans-serif;
  }
`;

export const ButtonSelection = styled.div`
  display: flex;
  width: 100%;

  align-items: center;
  justify-content: space-evenly;

  button {
    height: 2.25rem;
    width: 5rem;
    padding: 0px 16px;
    border: 0;
    border-radius: 4px;

    font-size: 14px;
    font-weight: bold;

    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInPrimary};

    transition: background 0.2s;

    &:hover {
      background: ${({ theme }) => darken(0.03, theme.colors.primary)};
    }
  }
`;
