import { FormControlLabel } from "@material-ui/core";
import { createTheme } from "@mui/material/styles";

// color pallete: https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590


export const theme = createTheme({
    palette: {
        primary: {
            main: '#ac1a2f'
        },
        secondary: {
            main: '#ffffff',
            dark: '#494949'
        },
    },
    typography: {
        fontFamily: "Roboto Condensed",
        h1: {
          fontSize: 36,
          fontWeight: 700,
          fontStyle: 'italic'
        },
        h2: {
          fontSize: 28,
          fontWeight: 700,
          fontStyle: "italic"
        },
        h3: {
          fontSize: 28,  
          fontWeight: 500,
        },
        h4: {
          fontSize: 24,
          fontWeight: 500,
          color: "black"
        },
        h5: {
          fontSize: 24,
          fontWeight: 700,
          color: "white"
        },
        button: {
          fontStyle: 'italic',
        },
      },

})