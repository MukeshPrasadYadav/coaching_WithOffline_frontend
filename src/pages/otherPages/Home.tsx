// src/pages/otherPages/Home.tsx


import { lazy, Suspense } from "react";
import {  Role, useAuthStore } from "../../store/auth.store";
import { Navigate } from "react-router-dom";


const CoachingDashboard = lazy(() => import("../../Components/dashboards/CoachingDashboard"));
const TeacerDashboard = lazy(() => import("../../Components/dashboards/TeacherDashboarad"))
const StudentDashboard = lazy(() => import("../../Components/dashboards/StudentDashboard"))
const ParentDashboard = lazy(() => import("../../Components/dashboards/ParentDashboard"))


const Home = () => {
  const user = useAuthStore(state => state.user)
  if(!user) return null;

  const role: Role = user.role;
  console.log("user in home page",user)

  if (!user.isProfileCompleted) {
  return <Navigate to="/completeProfile" replace />;
}
 

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {role === Role.ADMIN && <CoachingDashboard />}
      {role === Role.PARENT && <ParentDashboard />}
      {role === Role.STUDENT && <StudentDashboard />}
      {role === Role.TEACHER && <TeacerDashboard />}
    </Suspense>
  )
}

export default Home