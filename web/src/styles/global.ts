import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @media(max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }
  
  @media(max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
  
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  
  body {
    background: ${({ theme }) => theme.background};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 400 0.875rem, sans-serif;
  }

  /*
  #__next {

  }
  */

  button {
    cursor: pointer;
  }
`;
