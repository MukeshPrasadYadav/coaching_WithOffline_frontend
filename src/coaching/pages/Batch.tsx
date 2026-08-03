// src/coaching/pages/Batch.tsx

import { lazy, Suspense, useEffect } from "react";
import {  Role, useAuthStore } from "../../store/auth.store";
import { Navigate } from "react-router-dom";




const CoachingBatch = lazy(() => import("../../pages/coaching/CoachingBatchPage"));
const StudentBatch = lazy(() => import("../../pages/students/StudentBatchePage"));
const TeacherBatch = lazy(() => import("../../pages/teacher/TeacherBatchPage"));

const Batch = () => {

  const user = useAuthStore(state => state.user)

    const role: Role | undefined = user?.role;

  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {role === Role.ADMIN  && <CoachingBatch />}
      {role === Role.STUDENT && <StudentBatch />}
      {role === Role.TEACHER && <TeacherBatch />}
    </Suspense>

  )
}

export default Batch;
