// src/Components/dashboards/CoachingDashboard.tsx
// src/Components/CoachingDashboard.tsx
import AnalyticsCard from '../ui/AnalyticsCard'
import FeeCollectionChart from '../../coaching/components/FeeCollectionChart'
import AdmissionChart from '../../coaching/components/AdmissionChart'
import ScheduleCard from '../../coaching/components/ScheduleCard'
import RecentAdmissionCard from '../../coaching/components/RecentAdmissionCard'
import PendingFeesCard from '../../coaching/components/PendingFeesCard'
import AttendanceCard from '../../coaching/components/AttendanceCard'
import NoticeCard from '../../coaching/components/NoticeCard'
import { CalendarCheck, IndianRupee, User, Users } from 'lucide-react'

const CoachingDashboard = () => {
  return (
    <div className='space-y-6'>
      {/* card area */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
       <AnalyticsCard title="Total Students" icon={Users} value={248} subTitle='Across active batches' iconBg='#EFF6FF' iconColor='#2563EB' />
        <AnalyticsCard title="Teachers" icon={User} value={18} subTitle='Full-time and visiting' iconBg='#ECFDF5' iconColor='#10B981' />
        <AnalyticsCard title="Today Attendance" icon={CalendarCheck} value='91%' subTitle='Average check-in rate' iconBg='#FFFBEB' iconColor='#F59E0B' />
        <AnalyticsCard title="Revenue" icon={IndianRupee} value='1.1L' subTitle='Collected this month' iconBg='#EEF4FF' iconColor='#2563EB' />
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
