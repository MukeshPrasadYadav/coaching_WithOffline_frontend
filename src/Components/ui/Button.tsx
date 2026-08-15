// src/Components/ui/Button.tsx

import { forwardRef } from "react";
import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

type AppButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "soft";

export interface ButtonProps
  extends Omit<MuiButtonProps, "variant" | "color"> {
  variant?: AppButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", sx, children, ...props }, ref) => {
    // Map custom variants to MUI variants
    const muiVariant: MuiButtonProps["variant"] =
      variant === "outline"
        ? "outlined"
        : variant === "ghost"
          ? "text"
          : "contained";

    // Custom styling for each variant
    const variantSx = {
      primary: {
        bgcolor: "primary.main",
        color: "primary.contrastText",

        "&:hover": {
          bgcolor: "primary.dark",
        },
      },

      secondary: {
        bgcolor: "secondary.main",
        color: "secondary.contrastText",

        "&:hover": {
          bgcolor: "secondary.dark",
        },
      },

      outline: {
        borderColor: "divider",
        color: "text.primary",

        "&:hover": {
          bgcolor: "action.hover",
          borderColor: "text.primary",
        },
      },

      ghost: {
        color: "text.primary",

        "&:hover": {
          bgcolor: "action.hover",
        },
      },

      soft: {
        bgcolor: "action.hover",
        color: "text.primary",
        boxShadow: "none",

        "&:hover": {
          bgcolor: "action.selected",
        },
      },
    }[variant];

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        disableElevation
        sx={[
          {
            borderRadius: "12px",
            px: 2.5,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.875rem",
            letterSpacing: "0.01em",
            transition: "all 0.2s ease",
          },
          variantSx,
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";

export default Button;