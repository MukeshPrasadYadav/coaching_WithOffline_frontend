// src/main.tsx
import { StrictMode, useEffect, useMemo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import { useThemeStore } from './store/theme.store.ts';
import { createAppTheme } from './theme.ts';
import AuthProvider from './store/AuthProvider.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useThemeStore();
  const muiTheme = useMemo(() => createAppTheme(theme), [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>

        <AuthProvider>
          <App />
          </AuthProvider>
        
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
