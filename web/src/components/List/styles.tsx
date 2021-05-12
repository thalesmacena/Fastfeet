import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      text-align: center;

      height: 2.25rem;
      width: 8.875rem;
      padding: 0px 16px;
      border-radius: 4px;

      font-size: 14px;
      font-weight: bold;

      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.textInPrimary};

      transition: background 0.2s;

      &:hover {
        background: ${({ theme }) => darken(0.03, theme.colors.primary)};
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const ListTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;

  thead th {
    text-align: left;
    color: ${({ theme }) => theme.colors.textInBackground};
    font-size: 1rem;
    padding: 0.375rem 0.938rem 0;

    &:last-child {
      text-align: right;
    }
  }

  tbody td {
    background: ${({ theme }) => theme.colors.background};
    height: 57px;
    padding: 6px 15px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;

    &:last-child {
      text-align: right;

      border-bottom-right-radius: 6px;
      border-top-right-radius: 6px;
    }

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    div {
      display: flex;
      align-items: center;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 5px;
      object-fit: cover;
    }
  }
`;
