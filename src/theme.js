import { createTheme } from "@mui/material/styles";

// color pallete: https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590


export const theme = createTheme({
    palette: {
        primary: {
            main: '#AC1A2F',
        },
        secondary: {
            main: '#F5F5F5',
            dark: '#F5F5F5'
        },
    },
    typography: {
        fontFamily: "Roboto Condensed",
        p: {
          fontSize: 18,
          fontFamily: "Roboto Condensed",
          color: "#494949"
        },
        h1: {
          fontSize: 28,
          fontWeight: 700,
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
        button: {
          fontWeight: 700,
          fontSize: 18
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
      },

})