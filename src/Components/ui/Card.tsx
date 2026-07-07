// src/Components/ui/Card.tsx
import type { ReactNode } from "react";
import type { CardProps as MuiCardProps } from "@mui/material/Card";
import { Box, Card as MuiCard, Stack, Typography } from "@mui/material";

export interface CardProps extends MuiCardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  padded?: boolean;
  size?: "small" | "medium" | "large";
}

const CARD_WIDTHS = {
  small: 450,
  medium: 800,
  large: 1440,
};

export function Card({
  title,
  subtitle,
  action,
  padded = true,
  size = "medium",
  children,
  sx,
  ...props
}: CardProps) {
  return (
    <MuiCard
      {...props}
      sx={[
        {
          position: "relative",
          width: "100%",
          maxWidth: CARD_WIDTHS[size],
          mx: "auto", // center horizontally
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ p: padded ? 2.5 : 0 }}>
        {(title || subtitle || action) && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
            mb={padded ? 2 : 0}
          >
            <Box>
              {title && (
                <Typography variant="h6">
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {subtitle}
                </Typography>
              )}
            </Box>

            {action}
          </Stack>
        )}

        {children}
      </Box>
    </MuiCard>
  );
}

export default Card;