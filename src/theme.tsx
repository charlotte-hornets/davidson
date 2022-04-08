import React from "react";
import { createTheme } from "@material-ui/core";
import { PaletteMode } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

// color pallete: https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590


export const theme = (mode: string) => {
  if (mode === "light") {
    return createTheme({

      palette: {
        // palette values for light mode
        mode: "light",
        primary: {main: "#AC1A2F"},
        secondary: {main: "#F5F5F5"},
        text: {
          primary: '#000',
          secondary: "#494949",
        },
        background: {default: "#F5F5F5"}
      },
      zIndex: {
        appBar: 1201,
      },
      typography: {
        fontFamily: "Roboto Condensed",
        h1: {
          fontSize: 54,
          fontWeight: 700,
        },
        h2: {
          fontSize: 36,
          fontWeight: 700,
        },
        h3: {
          fontSize: 28,
          fontWeight: 700,
        },
        button: {
          fontWeight: 700,
          fontSize: 18,
        },
        h4: {
          fontSize: 24,
          fontWeight: 500,
        },
        h5: {
          fontSize: 24,
          fontWeight: 700,
        },
      },
    });
  }
  return createTheme({
    palette: {
      // palette values for dark mode
      mode: "dark",
      primary: {main: "#AC1A2F"},
      secondary: {main: "#424242"},
      text: {
        primary: '#fff',
        secondary: "#F5F5F5",
      },
      background: {default: "#424242"}
    },
    zIndex: {
      appBar: 1201,
    },
    typography: {
      fontFamily: "Roboto Condensed",
      h1: {
        fontSize: 54,
        fontWeight: 700,
      },
      h2: {
        fontSize: 36,
        fontWeight: 700,
      },
      h3: {
        fontSize: 28,
        fontWeight: 700,
      },
      button: {
        fontWeight: 700,
        fontSize: 18,
      },
      h4: {
        fontSize: 24,
        fontWeight: 500,
      },
      h5: {
        fontSize: 24,
        fontWeight: 700,
      },
    },
  });
}



