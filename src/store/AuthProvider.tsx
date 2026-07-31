// src/store/AuthProvider.tsx
// AuthProvider.tsx

import { useEffect } from "react";
import { useGetUser } from "../hooks/auth.hooks";
import { useAuthStore } from "../store/auth.store";
import { Box, CircularProgress } from "@mui/material";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);

  const {
    data: user,
    isPending,
    status
  } = useGetUser();

  useEffect(() => {
    console.log("user",user)
    if(status ==="success") setUser(user);
    else if(status === "error") setUser(null);
  }, [user, status, setUser]);

  if (isPending) {
  return (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);
  }

  return <>{children}</>;
}