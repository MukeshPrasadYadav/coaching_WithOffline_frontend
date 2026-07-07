// src/helpers/ProtectedRoutes.tsx

import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useGetUser } from "../hooks/auth.hooks";


const ProtectedRoutes = ({children}: {children: ReactNode}) => {

   const {data: user, isPending} = useGetUser();

   if(isPending) {
    return <div>Loading...</div>
   }

   if(!user){
   return <Navigate to="/login" replace />
   }

   return children;
   

}

export default ProtectedRoutes