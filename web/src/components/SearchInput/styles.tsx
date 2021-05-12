import styled from 'styled-components';

export const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 240px;
    height: 36px;
    padding: 10px 10px 10px 40px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    transition: box-shadow 0.1s, border-color 0.1s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textInput};
    }
  }

  svg {
    position: absolute;
    left: 10px;
  }
`;
