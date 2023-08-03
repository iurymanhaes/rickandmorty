import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1ABED6",
    },
    secondary: {
      main: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#CCC",      
    },

    error: {
      main: red.A400,
    },
  },
  
});
export default theme;
