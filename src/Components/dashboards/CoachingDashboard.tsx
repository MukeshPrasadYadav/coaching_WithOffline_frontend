// src/Components/dashboards/CoachingDashboard.tsx
// src/Components/CoachingDashboard.tsx
import React from 'react'
import AnalyticsCard from '../ui/AnalyticsCard'
import FeeCollectionChart from '../../coaching/components/FeeCollectionChart'
import AdmissionChart from '../../coaching/components/AdmissionChart'
import ScheduleCard from '../../coaching/components/ScheduleCard'
import RecentAdmissionCard from '../../coaching/components/RecentAdmissionCard'
import PendingFeesCard from '../../coaching/components/PendingFeesCard'
import AttendanceCard from '../../coaching/components/AttendanceCard'
import NoticeCard from '../../coaching/components/NoticeCard'
import { BookOpen, IndianRupee, SquareCheck, User } from 'lucide-react'

const CoachingDashboard = () => {
  return (
    <div className='space-y-6'>
      {/* card area */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
       <AnalyticsCard title="Total class" icon = {BookOpen} value ={10} subTitle='Across all coachings' iconBg='#F3E8FF' iconColor='#7C3AED'  />
        <AnalyticsCard title="Total student" icon ={User} value ={10} subTitle='Across all coachings' iconBg='#E8F7EE' iconColor='#16A34A' />
        <AnalyticsCard title="Subject teachings" icon ={SquareCheck} value = {6}  subTitle='Across all coachings' iconBg='#FFF1E8' iconColor='#F97316' />
        <AnalyticsCard title="Total earning" icon = {IndianRupee } value ={1100} subTitle='From all classes' iconBg='#EEF4FF' iconColor='#2563EB' />
      </div>
      <div className="grid
          grid-cols-1
          xl:grid-cols-12
          gap-5">

              <div className="xl:col-span-5">
                  <FeeCollectionChart />
              </div>

              <div className="xl:col-span-4">
                  <AdmissionChart />
              </div>

              <div className="xl:col-span-3">
                  <ScheduleCard />
              </div>

          </div>

          {/* Bottom section */}
          <div className="grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-12
            gap-5">

                <div className="xl:col-span-3">
                    <RecentAdmissionCard />
                </div>

                <div className="xl:col-span-3">
                    <PendingFeesCard />
                </div>

                <div className="xl:col-span-3">
                    <AttendanceCard />
                </div>

                <div className="xl:col-span-3">
                    <NoticeCard />
                </div>

            </div>
    </div>
  )
}

export default CoachingDashboard