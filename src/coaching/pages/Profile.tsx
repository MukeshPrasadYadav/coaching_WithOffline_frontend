// src/coaching/pages/Profile.tsx
import { lazy, Suspense } from 'react'
import { Role, useAuthStore } from '../../store/auth.store';


const TeacherProfile = lazy(() => import('../../pages/otherPages/TeacherProfile'));
 const StudentProfile = lazy(() => import('../../pages/students/StudentProfile'));

const Profile = () => {

    const user = useAuthStore(state => state.user)
    
        const role: Role | undefined = user?.role;
  return (
   <Suspense fallback={<div>Loading...</div>}>
         {role === Role.STUDENT  && <StudentProfile />}
         {role === Role.TEACHER && <TeacherProfile />}
       </Suspense>
  )
}

export default Profile