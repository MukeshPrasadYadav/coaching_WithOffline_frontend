// src/helpers/ProtectedAuth.tsx
// src/helpers/ProtectedRoutes.tsx

import type { ReactNode } from "react"
import { useAuthStore } from "../store/auth.store"
import { Navigate } from "react-router-dom"


const ProtectedAuth = ({children}: {children: ReactNode}) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  return (
    isAuthenticated ? <Navigate to="/home" replace /> : children
  )
}

export default ProtectedAuth