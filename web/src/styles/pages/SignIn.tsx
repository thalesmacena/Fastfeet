import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 360px;
  padding: 60px 30px;
  text-align: center;

  img {
    width: 240px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 1.875rem;

    div {
      display: flex;
      flex-direction: column;
      margin: 0.625rem 0 0.875rem 0;
      text-align: left;

      strong {
        font: 700 0.875rem 'Inter', sans-serif;
        color: ${({ theme }) => theme.colors.textInBackground};
        margin: 0 0 0.875rem;
      }

      input {
        background: ${({ theme }) => theme.colors.background};
        border: 0;
        border-radius: 4px;
        height: 2.75rem;
        padding: 0 0.9rem;
        color: ${({ theme }) => theme.colors.textInBackground};
        border: 2px solid ${({ theme }) => theme.colors.divider};
        font: 400 1rem 'Inter', sans-serif;

        &:focus {
          border-color: ${({ theme }) => lighten(0.03, theme.colors.button)};
        }

        &::placeholder {
          color: ${({ theme }) => theme.colors.textInput};
        }
      }

      span {
        color: ${({ theme }) => theme.colors.error};
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
      }
    }

    button {
      margin: 5px 0 0;
      height: 45px;
      background: ${({ theme }) => theme.colors.button};
      font-weight: bold;
      color: ${({ theme }) => theme.colors.textInPrimary};
      border: 0;
      border-radius: 4px;
      font-size: 1rem;
      transition: background 0.2s;

      &:hover {
        background: ${({ theme }) => darken(0.03, theme.colors.button)};
      }

      &:disabled {
        background: ${({ theme }) => theme.colors.error};
        cursor: auto;
      }
    }
  }
`;
