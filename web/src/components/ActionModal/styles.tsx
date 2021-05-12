import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: absolute;
  width: 9.375rem;
  right: (9.375rem - 50%);
  z-index: 10;
  padding: 15px 10px;
  border-radius: 4px;
  margin-top: 5px;

  display: flex;
  flex-direction: column;

  box-shadow: ${({ theme }) => theme.boxShadowModal};
  background: #fff;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% + 5px);
    top: -10px;
    width: 0;
    height: 0;
    z-index: 1;

    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #fff;
  }

  &::before::after {
    content: '';
    position: absolute;
    width: 1000px;
    height: 1000px;
    z-index: 3;
    background: #000;
    transform: rotate(45deg);
    left: calc(50% + 5px);
    top: -10px;
  }

  div {
    width: 100%;

    & + div {
      border-top: 1px solid #eee;
      margin-top: 5px;
      padding-top: 5px;
    }

    button,
    a {
      border: 0;
      background: none;
      color: #999;
      font-size: 16px;
      display: flex;
      align-items: center;

      svg {
        margin-right: 10px;
      }
    }
  }
`;
