import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      100: 'hsl(95, 19%, 94%)',
      200: 'hsl(95, 19%, 84%)',
      300: 'hsl(95, 19%, 74%)',
      main: '#3E562D', // huset grønn
      light: '#86A074', // huset lysegrønn
      extraLight: 'hsl(95, 19%, 74%)',
      dark: 'hsl(95, 19%, 44%)',
    },
    secondary: {
      main: '#2E393F', // huset blå
    },
    accent: {
      main: '#F16D44', // huset accent
    },
    error: {
      main: '#A04044', // huset rød
    },
  },
  shadows: {
    0: '0px 0px 0px rgba(0,0,0,0)',
    1: '0px 2px 2px rgba(0,0,0,0.12)',
    8: '0px 2px 10px rgba(0,0,0,0.12)',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
  },
});

export default theme;
