import { MdBrightnessHigh, MdBrightnessLow } from 'react-icons/md';
import styled from 'styled-components';

export const LightSwitch = styled(MdBrightnessHigh)`
  cursor: 'pointer';
  color: ${({ theme }) => theme.colors.switch};
`;

export const DarkSwitch = styled(MdBrightnessLow)`
  cursor: 'pointer';
  color: ${({ theme }) => theme.colors.switch};
`;
