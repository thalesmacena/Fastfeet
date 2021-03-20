/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components';

interface Theme {
  colors: {
    background: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
