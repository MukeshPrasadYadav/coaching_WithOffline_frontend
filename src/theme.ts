import { alpha, createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';
  const primary = '#4F46E5';
  const accent = '#0F766E';

  return createTheme({
    palette: {
      mode,
      primary: { main: primary, light: '#6D67FF', dark: '#3730A3', contrastText: '#fff' },
      secondary: { main: '#111827', light: '#374151', dark: '#030712', contrastText: '#fff' },
      success: { main: '#0F9D58' },
      warning: { main: '#D97706' },
      info: { main: '#0284C7' },
      background: {
        default: isDark ? '#090B11' : '#F4F6FB',
        paper: isDark ? '#11151D' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F5F7FA' : '#0F172A',
        secondary: isDark ? '#A3A8B8' : '#526072',
      },
      divider: isDark ? '#242A36' : '#E5E8F0',
      action: {
        hover: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15, 23, 42, 0.04)',
        selected: alpha(primary, 0.12),
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: '"Manrope", "Segoe UI", "Avenir Next", sans-serif',
      h4: { fontWeight: 700, letterSpacing: '-0.035em' },
      h5: { fontWeight: 700, letterSpacing: '-0.025em' },
      h6: { fontWeight: 700, letterSpacing: '-0.02em' },
      subtitle1: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: 'smooth',
          },
          body: {
            minWidth: 320,
            background: isDark
              ? 'radial-gradient(circle at top left, rgba(79,70,229,0.18), transparent 34%), linear-gradient(180deg, #090B11 0%, #0B0F16 100%)'
              : 'radial-gradient(circle at top left, rgba(79,70,229,0.10), transparent 30%), linear-gradient(180deg, #F8FAFC 0%, #EFF3FA 100%)',
          },
          '*': { boxSizing: 'border-box' },
          '::selection': {
            background: alpha(primary, 0.2),
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 999,
            minHeight: 40,
            paddingInline: 18,
            letterSpacing: '-0.01em',
          },
          containedPrimary: {
            boxShadow: `0 10px 24px ${alpha(primary, 0.18)}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${isDark ? '#242A36' : '#E5E8F0'}`,
            boxShadow: isDark ? '0 16px 36px rgba(0,0,0,.32)' : '0 12px 30px rgba(15, 23, 42, .05)',
            borderRadius: 20,
            overflow: 'hidden',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            border: `1px solid ${isDark ? '#242A36' : '#E5E8F0'}`,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            background: isDark ? '#0F131A' : '#FFFFFF',
          },
          notchedOutline: {
            borderColor: isDark ? '#2A3140' : '#DCE3EE',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 10,
            fontSize: 12,
            backgroundColor: isDark ? '#0B0F16' : '#0F172A',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark ? '#242A36' : '#E5E8F0',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
    },
  });
};
