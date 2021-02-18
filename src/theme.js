import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1de8b5',
      light: '#6dffe7',
      dark: '#00b585'
    },
    secondary: {
      main: '#f06292',
      light: '#ff94c2',
      dark: '#ba2d65'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F5F5F6',
    },
  },
});

export default theme;
