import styled, { DefaultTheme } from 'styled-components';

const handleStatusColor = (statusTag: string, theme: DefaultTheme) => {
  switch (statusTag) {
    case 'delivered':
      return `background: ${theme.colors.finishedBar}; color: ${theme.colors.finished}; &::before { background: ${theme.colors.finished}}`;
    case 'takeout':
      return `background: ${theme.colors.takeoutBar}; color: ${theme.colors.takeout}; &::before { background: ${theme.colors.takeout}}`;
    case 'pending':
      return `background: ${theme.colors.pendingBar}; color: ${theme.colors.pending}; &::before { background: ${theme.colors.pending}}`;
    default:
      return `background: ${theme.colors.errorBar}; color: ${theme.colors.error}; &::before { background: ${theme.colors.error}}`;
  }
};

type StatusTag = {
  statusTag: string;
};

export const StatusTagContainer = styled.span<StatusTag>`
  ${({ statusTag, theme }) => handleStatusColor(statusTag, theme)};

  text-transform: uppercase;
  padding: 3px 7px;
  border-radius: 12px;
  font-size: 0.875rem;
  display: inline-block;
  font-weight: bold;

  &::before {
    content: '';
    display: inline-block;
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 5px;
    margin-right: 6px;
  }
`;
