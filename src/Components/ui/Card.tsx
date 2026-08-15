// src/Components/ui/Card.tsx

import type { ReactNode } from "react";
import {
  Card as MuiCard,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import type { CardProps as MuiCardProps } from "@mui/material/Card";

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
} as const;

function Card({
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
          mx: "auto",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06)",
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box
        sx={{
          p: padded ? 2.5 : 0,
        }}
      >
        {(title || subtitle || action) && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
            mb={padded ? 2 : 0}
          >
            {/* Title + Subtitle */}
            <Box sx={{ minWidth: 0 }}>
              {title && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </Typography>
              )}

              {subtitle && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: title ? 0.5 : 0,
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>

            {/* Action */}
            {action && (
              <Box
                sx={{
                  flexShrink: 0,
                }}
              >
                {action}
              </Box>
            )}
          </Stack>
        )}

        {/* Card Content */}
        {children}
      </Box>
    </MuiCard>
  );
}

Card.displayName = "Card";

export default Card;