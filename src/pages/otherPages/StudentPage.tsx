// src/pages/otherPages/StudentPage.tsx
import React, { lazy, Suspense } from 'react'
import { Role, useAuthStore } from '../../store/auth.store';

const StudentPageForTeacher = lazy(() => import("../../pages/teacher/StudentPageTeacher"));
const StudentPageForCoaching = lazy(() => import("../../coaching/pages/StudentPageCoaching"));

const StudentPage = () => {
      const user = useAuthStore((state) => state.user);
      const role = user?.role ;
      
    
  return (
    <Suspense fallback={<div>Loading...</div>}>
             {role === Role.TEACHER  && <StudentPageForTeacher  />}
             {role === Role.ADMIN && <StudentPageForCoaching />}
           </Suspense>
  )
}

export default StudentPage