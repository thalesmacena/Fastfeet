/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components';

interface Theme {
  colors: {
    background: string;
    backgroundDashboard: string;

    primary: string;
    textInPrimary: string;
    secondary: string;
    text: string;
    textInBackground: string;
    textInput: string;
    button: string;

    divider: string;
    switch: string;

    finished: string;
    finishedBar: string;
    pending: string;
    pendingBar: string;
    takeout: string;
    takeoutBar: string;
    error: string;
    errorBar: string;
  };
  background: string;
  modalOverlay: string;
  boxShadow: string;
  boxShadowModal: string;
  boxShadowAction: string;
  backgroundModalOverlay: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
