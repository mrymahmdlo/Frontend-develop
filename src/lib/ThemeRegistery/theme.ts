/**
 * Create custom mui theme for project
 */

import { createTheme } from '@mui/material/styles';
import '../../assets/fonts/css/fontiran.css';

import { buttons } from './components/base/buttons';
import { input } from './components/form/input';
import { colors } from './components/color/colors';
import { dialog } from './components/base/dialog';

const theme = createTheme({
  typography: {
    fontFamily: 'dana'
  },
  palette: { ...colors },
  components: {
    MuiButton: { ...buttons },
    MuiFilledInput: { ...input },
    MuiDialog: { ...dialog }
  }
});

declare module '@mui/material/styles' {
  interface PaletteColor {
    '100': string;
    '200': string;
    '300': string;
    '400': string;
    '500': string;
    '600': string;
    '700': string;
    '800': string;
    '900': string;
    light: string;
    main: string;
    dark: string;
  }
  interface Palette {
    gray: Palette['primary'];
  }
  interface PaletteOptions {
    gray: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    darkGray: true;
  }
}

export default theme;
