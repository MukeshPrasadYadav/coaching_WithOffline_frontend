// src/Components/ui/Sidebar.tsx

import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

import {
  Role,
  useAuthStore,
} from "../../store/auth.store";

const CoachingSider = lazy(
  () => import("../sideBars/CoachingSider")
);

const ParentSider = lazy(
  () => import("../sideBars/ParentSider")
);

const StudentSider = lazy(
  () => import("../sideBars/StudentSider")
);

const TeacherSider = lazy(
  () => import("../sideBars/TeacherSider")
);

export interface SidebarProps {
  open: boolean;
  isDesktop: boolean;
  onClose: () => void;
}

export default function Sidebar({
  open,
  isDesktop,
  onClose,
}: SidebarProps) {
  const user = useAuthStore(
    (state) => state.user
  );

  // Don't render sidebar if user isn't authenticated
  if (!user) {
    return null;
  }

  // Don't render when sidebar is closed
  if (!open) {
    return null;
  }

  const role: Role = user.role;

  return (
  <Suspense
    fallback={
      <Box
        sx={{
          width: 260,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <CircularProgress size={24} />
      </Box>
    }
  >
    {role === Role.ADMIN && (
      <CoachingSider
        open={open}
        isDesktop={isDesktop}
        onClose={onClose}
      />
    )}

    {role === Role.PARENT && (
      <ParentSider
        open={open}
        isDesktop={isDesktop}
        onClose={onClose}
      />
    )}

    {role === Role.STUDENT && (
      <StudentSider
        open={open}
        isDesktop={isDesktop}
        onClose={onClose}
      />
    )}

    {role === Role.TEACHER && (
      <TeacherSider
        open={open}
        isDesktop={isDesktop}
        onClose={onClose}
      />
    )}
  </Suspense>
);
}