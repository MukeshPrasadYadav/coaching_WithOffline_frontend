// src/Components/dashboards/TeacherDashboarad.tsx
// src/Components/TeacherDashboarad.tsx

import AnalyticsCard from '../ui/AnalyticsCard'
import { BookOpen, IndianRupee, SquareCheck, User } from 'lucide-react'

const TeacherDashboarad = () => {
  return (
    <div className='space-y-6'>
      {/* card area */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard title="Total class" icon = {BookOpen} value ={10} subTitle='Across all coachings' iconBg='#F3E8FF' iconColor='#7C3AED'  />
        <AnalyticsCard title="Total student" icon ={User} value ={10} subTitle='Across all coachings' iconBg='#E8F7EE' iconColor='#16A34A' />
        <AnalyticsCard title="Subject teachings" icon ={SquareCheck} value = {6}  subTitle='Across all coachings' iconBg='#FFF1E8' iconColor='#F97316' />
        <AnalyticsCard title="Total earning" icon = {IndianRupee } value ={1100} subTitle='From all classes' iconBg='#EEF4FF' iconColor='#2563EB' />
      </div>

        {/* middle section */}
      <div className='flex flex-row gap-x-2'>
      

      </div>

    </div>
  )
}

export default TeacherDashboarad