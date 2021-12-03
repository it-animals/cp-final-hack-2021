import { createTheme } from "@mui/material";
import { _variables } from "./_variables";

export const MUITheme = createTheme({
  palette: {
    primary: {
      main: _variables.primaryColor,
    },
    background: {
      default: _variables.backgroundColor,
    },
    secondary: {
      main: _variables.secondColor,
    },
    text:{
      primary:_variables.textColor
    }
  },
});
