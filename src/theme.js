import { blue, grey, red } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode

          primary:{
              main:"#efefef",
              main2:"#ff9600",
              secondary:"#fff"
          },
          secondary:red,
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
          typography: {
              fontFamily: 
                'roboto, sans-serif',
            },
            components: {
              MuiCssBaseline: {
                styleOverrides: `
                  @font-face {
                    font-family: 'Poppins, sans-serif';
                  }
                `
              },
          }
        }

      : {
          // palette values for dark mode
          primary:{
            main:"#1b1b1b",
            secondary:"#424242"
          },
          secondary:red,
          danger:red[700],
          divider: grey,
          background: {
            primary:'#1b1b1b',
            secondary: grey[900],
          },
          text: {
            primary: '#fff',
            secondary: "#bdbdbd",
          },
            typography: {
              fontFamily:
                  'roboto, sans-serif',
            },
        }),
  },
});

