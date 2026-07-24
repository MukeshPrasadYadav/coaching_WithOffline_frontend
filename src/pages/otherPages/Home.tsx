// src/pages/otherPages/Home.tsx


import { lazy, Suspense, useEffect } from "react";
import {  Role, useAuthStore } from "../../store/auth.store";
import { Navigate } from "react-router-dom";
import { useGetCoaching } from "../../hooks/coaching.hooks";
import { useCoachingStore } from "../../store/coaching.store";


const CoachingDashboard = lazy(() => import("../../Components/dashboards/CoachingDashboard"));
const TeacherDashboard = lazy(() => import("../teacher/Dashboard"))
const StudentDashboard = lazy(() => import("../../Components/dashboards/StudentDashboard"))
const ParentDashboard = lazy(() => import("../../Components/dashboards/ParentDashboard"))


const Home = () => {
  const user = useAuthStore(state => state.user)
  const setCoaching = useCoachingStore(state => state.setCoaching);

  const { data } = useGetCoaching(
  user?.role === Role.ADMIN
);

useEffect(() => {
  if (data) {
    console.log(data);
    setCoaching(data);
  }
}, [data]);

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
      {role === Role.TEACHER && <TeacherDashboard />}
    </Suspense>
  )
}

export default Home
