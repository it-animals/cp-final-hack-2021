import { createGlobalStyle, css } from "styled-components";
import { _reset } from "./_reset";
import { _fonts } from "./_fonts";
import { _variables } from "./_variables";
import { _md } from "./_md";

const includes = css`
  ${_reset}
  ${_fonts}
  ${_md}
`;

export const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
    line-height: 24px;
    position: relative;
    background-color: ${_variables.backgroundColor};
    min-width: 1240px;
    min-height: 100vh;
  }

  ${includes}
  
  * {
    box-sizing: border-box;
  }
  a{
    text-decoration: none !important;
  }
  
  .MuiPopover-paper{
    box-shadow: none !important;
  }
`;
