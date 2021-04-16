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

    finished: string;
    finishedBar: string;
    pending: string;
    pendingBar: string;
    withdrawal: string;
    withdrawalBar: string;
    error: string;
    errorBar: string;
  };
  background: string;
  modalOverlay: string;
  boxShadow: string;
  boxShadowModal: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
