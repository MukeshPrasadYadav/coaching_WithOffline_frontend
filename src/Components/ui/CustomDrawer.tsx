// src/Components/ui/CustomDrawer.tsx
import { Drawer, Box, IconButton, Typography, Divider } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { ReactNode } from "react";

type DrawerSize = "sm" | "md" | "lg" | "xl";
type DrawerDirection = "left" | "right" | "top" | "bottom";

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  anchor?: DrawerDirection;
  size?: DrawerSize;
  children: ReactNode;
}

const drawerSizes: Record<DrawerSize, string> = {
  sm: "320px",
  md: "480px",
  lg: "720px",
  xl: "960px",
};

export default function CustomDrawer({
  open,
  onClose,
  title,
  anchor,
  size ,
  children,
}: CustomDrawerProps) {
  const isHorizontal = anchor === "left" || anchor === "right";

  return (
    <Drawer
  anchor={anchor}
  open={open}
  onClose={onClose}
  slotProps={{
    paper: {
      sx: {
        width: isHorizontal ? drawerSizes[size ?? "lg"] : "100%",
        height: isHorizontal ? "100vh" : drawerSizes[size ?? "lg"],
      },
    },
  }}
>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1.5}
      >
        <Typography variant="h6">{title}</Typography>

        <IconButton onClick={onClose}>
          <CloseOutlined />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 2, flex: 1, overflow: "auto" }}>
        {children}
      </Box>
    </Drawer>
  );
}