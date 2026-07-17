// src/Components/ui/Sidebar.tsx

import { lazy, Suspense } from "react";

import { Role, useAuthStore } from "../../store/auth.store";
const CoachingSider = lazy(() => import("../sideBars/CoachingSider"));
const ParentSider  = lazy(()=>import("../sideBars/ParentSider"));
const StudentSider = lazy(() => import("../sideBars/StudentSider"));
const TeacherSider = lazy(() => import("../sideBars/TeacherSider"));

export interface SidebarProps {
  open: boolean;
  isDesktop: boolean;
  onClose: () => void;
}

// src/Components/ui/Sidebar.tsx
export default function Sidebar({ open, isDesktop, onClose }: SidebarProps) {


   const user = useAuthStore(state => state.user)
    if(!user) return null;
  
    const role: Role = user.role
    if (!open) return null;

  return (
    <Suspense fallback={<div>...Loading </div>}>
      {role === Role.ADMIN && <CoachingSider open={open} isDesktop={isDesktop} onClose={onClose} />}
      {role === Role.PARENT && <ParentSider open={open} isDesktop={isDesktop} onClose={onClose} />}
      {role === Role.STUDENT && <StudentSider open={open} isDesktop={isDesktop} onClose={onClose} />}
      {role === Role.TEACHER && <TeacherSider open={open} isDesktop={isDesktop} onClose={onClose} />}
    </Suspense>
  );
}
