// src/Components/ui/Button.tsx
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { Button as MuiButton } from '@mui/material';

type AppButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color'> {
  variant?: AppButtonVariant;
}

export function Button({ variant = 'primary', sx, children, ...props }: ButtonProps) {
  const variantProps =
    variant === 'outline'
      ? { variant: 'outlined' as const }
      : variant === 'ghost'
        ? { variant: 'text' as const }
        : { variant: 'contained' as const };

  const toneSx =
    variant === 'secondary'
      ? {
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
          '&:hover': { bgcolor: 'secondary.dark' },
        }
      : variant === 'soft'
        ? {
            bgcolor: (theme: any) => theme.palette.action.hover,
            color: 'text.primary',
            '&:hover': {
              bgcolor: (theme: any) => theme.palette.action.selected,
            },
          }
        : variant === 'ghost'
          ? {
              color: 'text.primary',
            }
          : {};

  return (
    <MuiButton
      disableElevation
      {...variantProps}
      sx={[
        {
          borderRadius: 999,
          px: 2,
          py: 1,
          textTransform: 'none',
          fontWeight: 700,
        },
        toneSx,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
