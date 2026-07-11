export type DashboardStatus = 'active' | 'completed' | 'upcoming' | 'cancelled';
export type StatisticIconKey = 'classes' | 'students' | 'subjects' | 'earnings';

export interface TeacherDashboardTeacher {
  id: string;
  name: string;
  avatarUrl?: string;
  roleLabel: string;
}

export interface TeacherDashboardStatistic {
  id: string;
  title: string;
  value: string;
  growth: number;
  subtitle: string;
  iconKey: StatisticIconKey;
}

export interface CoachingCenter {
  id: string;
  title: string;
  subtitle: string;
  status: DashboardStatus;
  avatarText: string;
}

export interface TodayScheduleItem {
  id: string;
  time: string;
  className: string;
  coaching: string;
  room: string;
  status: Extract<DashboardStatus, 'completed' | 'upcoming' | 'cancelled'>;
}

export interface SubjectTeaching {
  id: string;
  name: string;
  classRange: string;
  classesCount: number;
}

export interface Degree {
  id: string;
  degree: string;
  university: string;
  year: string;
}

export interface UpcomingClass {
  id: string;
  date: {
    day: string;
    month: string;
  };
  subject: string;
  coaching: string;
  room: string;
  time: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  time: string;
}

export interface TeacherDashboard {
  teacher: TeacherDashboardTeacher;
  statistics: TeacherDashboardStatistic[];
  coachings: CoachingCenter[];
  todaySchedule: TodayScheduleItem[];
  subjects: SubjectTeaching[];
  degrees: Degree[];
  upcomingClasses: UpcomingClass[];
  announcements: Announcement[];
}
