import styled from 'styled-components';

export const ContainerHeader = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 0 30px;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 260px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid ${({ theme }) => theme.colors.divider};
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

interface INavLink {
  active: boolean;
}

export const NavLink = styled.span<INavLink>`
  a {
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme, active }) =>
      active ? theme.colors.textInBackground : theme.colors.textInput};
    margin-right: 15px;

    &:hover {
      color: ${({ theme }) => theme.colors.textInBackground};
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid ${({ theme }) => theme.colors.divider};

  div {
    text-align: right;
    margin-right: 10x;

    strong {
      display: block;
      color: ${({ theme }) => theme.colors.text};
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: ${({ theme }) => theme.colors.textInput};
    }

    button {
      background: none;
      border: 0;
      color: ${({ theme }) => theme.colors.textInput};

      &:hover {
        color: ${({ theme }) => theme.colors.textInBackground};
      }
    }
  }
`;
