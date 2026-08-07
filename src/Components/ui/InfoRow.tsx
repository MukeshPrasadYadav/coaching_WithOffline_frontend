// src/Components/ui/InfoRow.tsx
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color?: string;
  bgColor?: string;
}

const InfoRow = ({
  icon,
  label,
  value,
  color,
  bgColor,
}: InfoRowProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <Avatar
        sx={{
          bgcolor: bgColor ?? "primary.lighter",
          color: color ?? "primary.main",
          width: 36,
          height: 36,
        }}
      >
        {icon}
      </Avatar>

      <Box flex={1}>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {label}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={600}
        >
          {value || "-"}
        </Typography>
      </Box>
    </Stack>
  );
};

export default InfoRow;