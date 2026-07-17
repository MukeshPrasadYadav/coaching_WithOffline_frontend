import { alpha, createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';
  const primary = '#2563EB';
  return createTheme({
    palette: {
      mode,
      primary: { main: primary, light: '#3B82F6', dark: '#1D4ED8', contrastText: '#fff' },
      secondary: { main: '#111827', light: '#374151', dark: '#030712', contrastText: '#fff' },
      success: { main: '#10B981' },
      warning: { main: '#F59E0B' },
      error: { main: '#EF4444' },
      info: { main: '#3B82F6' },
      background: {
        default: isDark ? '#090B11' : '#F8FAFC',
        paper: isDark ? '#11151D' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F5F7FA' : '#111827',
        secondary: isDark ? '#A3A8B8' : '#6B7280',
      },
      divider: isDark ? '#242A36' : '#E5E7EB',
      action: {
        hover: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15, 23, 42, 0.04)',
        selected: alpha(primary, 0.12),
      },
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Inter", system-ui, sans-serif',
      h4: { fontSize: 32, fontWeight: 700, letterSpacing: 0 },
      h5: { fontSize: 22, fontWeight: 700, letterSpacing: 0 },
      h6: { fontSize: 16, fontWeight: 700, letterSpacing: 0 },
      body1: { fontSize: 14, fontWeight: 400 },
      body2: { fontSize: 14, fontWeight: 400 },
      caption: { fontSize: 12 },
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
            background: isDark ? '#090B11' : '#F8FAFC',
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
            borderRadius: 10,
            minHeight: 40,
            paddingInline: 16,
            letterSpacing: 0,
            transition: 'background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
            '&:hover': {
              boxShadow: '0 6px 18px rgba(15,23,42,0.08)',
              transform: 'translateY(-1px)',
            },
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
            border: `1px solid ${isDark ? '#242A36' : '#E5E7EB'}`,
            boxShadow: isDark ? '0 16px 36px rgba(0,0,0,.32)' : '0 4px 16px rgba(15,23,42,0.06)',
            borderRadius: 16,
            overflow: 'hidden',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            border: `1px solid ${isDark ? '#242A36' : '#E5E7EB'}`,
            boxShadow: '0 12px 32px rgba(15,23,42,0.12)',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            background: isDark ? '#0F131A' : '#FFFFFF',
          },
          notchedOutline: {
            borderColor: isDark ? '#2A3140' : '#E5E7EB',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            border: `1px solid ${isDark ? '#242A36' : '#E5E7EB'}`,
            boxShadow: '0 4px 16px rgba(15,23,42,0.06)',
            backgroundColor: isDark ? '#11151D' : '#FFFFFF',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: isDark ? '#11151D' : '#FFFFFF',
            color: isDark ? '#F5F7FA' : '#111827',
            fontWeight: 600,
            fontSize: 12,
          },
          body: {
            fontSize: 14,
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
            },
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
            borderColor: isDark ? '#242A36' : '#E5E7EB',
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
