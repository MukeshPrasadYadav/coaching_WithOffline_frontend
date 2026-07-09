// src/Components/ui/Sidebar.tsx

import { lazy, Suspense } from "react";

import { Role, useAuthStore } from "../../store/auth.store";
const CoachingSider = lazy(() => import("../sideBars/CoachingSider"));
const ParentSider  = lazy(()=>import("../sideBars/ParentSider"));
const StudentSider = lazy(() => import("../sideBars/StudentSider"));
const TeacherSider = lazy(() => import("../sideBars/TeacherSider"));

// src/Components/ui/Sidebar.tsx
export default function Sidebar() {


   const user = useAuthStore(state => state.user)
    if(!user) return null;
  
    const role: Role = user.role
  return (
    <div className="w-64 border-r border-[rgb(var(--border))] bg-[rgb(var(--card))] h-screen p-4">
      <div className="space-y-1">
        <Suspense fallback={<div>...Loading </div>}>
        {role === Role.ADMIN && <CoachingSider />}
        {role === Role.PARENT && <ParentSider />}
        {role === Role.STUDENT && <StudentSider />}
        {role === Role.TEACHER && <TeacherSider />}
        </Suspense>
      </div>
    </div>
  );
}