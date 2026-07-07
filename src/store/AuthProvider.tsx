// src/store/AuthProvider.tsx
// AuthProvider.tsx

import { useEffect } from "react";
import { useGetUser } from "../hooks/auth.hooks";
import { useAuthStore } from "../store/auth.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);

  const {
    data: user,
    isPending,
    isError,
  } = useGetUser();

  useEffect(() => {
    if (user) {
      setUser(user);
    } else if (isError) {
      setUser(null);
    }
  }, [user, isError, setUser]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}