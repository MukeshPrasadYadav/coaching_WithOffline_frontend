// src/mocks/dashboardMock.ts
import type { TeacherDashboard } from '../types/dashboard';

export const dashboardMock: TeacherDashboard = {
  teacher: {
    id: 'teacher-001',
    name: 'Ananya Sharma',
    roleLabel: 'Senior Mathematics Faculty',
  },
  statistics: [
    {
      id: 'total-classes',
      title: 'Total Classes',
      value: '128',
      growth: 12.5,
      subtitle: 'Across all coaching centers',
      iconKey: 'classes',
    },
    {
      id: 'total-students',
      title: 'Total Students',
      value: '1,248',
      growth: 8.2,
      subtitle: 'Currently enrolled students',
      iconKey: 'students',
    },
    {
      id: 'subjects-teaching',
      title: 'Subjects Teaching',
      value: '6',
      growth: 4.8,
      subtitle: 'Active subject assignments',
      iconKey: 'subjects',
    },
    {
      id: 'monthly-earnings',
      title: 'Monthly Earnings',
      value: '₹82,400',
      growth: 16.4,
      subtitle: 'Estimated for this month',
      iconKey: 'earnings',
    },
  ],
  coachings: [
    {
      id: 'coaching-001',
      title: 'Bright Future Academy',
      subtitle: 'JEE Foundation • 8 active batches',
      status: 'active',
      avatarText: 'BF',
    },
    {
      id: 'coaching-002',
      title: 'Scholars Point',
      subtitle: 'Board Excellence • 5 active batches',
      status: 'active',
      avatarText: 'SP',
    },
    {
      id: 'coaching-003',
      title: 'Concept Lab Classes',
      subtitle: 'Olympiad Prep • 3 active batches',
      status: 'active',
      avatarText: 'CL',
    },
  ],
  todaySchedule: [
    {
      id: 'schedule-001',
      time: '09:00 AM',
      className: 'Class 10 Mathematics',
      coaching: 'Bright Future Academy',
      room: 'Room 204',
      status: 'completed',
    },
    {
      id: 'schedule-002',
      time: '12:30 PM',
      className: 'Class 12 Physics',
      coaching: 'Scholars Point',
      room: 'Lab 2',
      status: 'upcoming',
    },
    {
      id: 'schedule-003',
      time: '04:00 PM',
      className: 'JEE Problem Solving',
      coaching: 'Concept Lab Classes',
      room: 'Room 101',
      status: 'cancelled',
    },
  ],
  subjects: [
    {
      id: 'subject-001',
      name: 'Mathematics',
      classRange: 'Classes 9-12',
      classesCount: 48,
    },
    {
      id: 'subject-002',
      name: 'Physics',
      classRange: 'Classes 11-12',
      classesCount: 34,
    },
    {
      id: 'subject-003',
      name: 'Quantitative Aptitude',
      classRange: 'Competitive Exams',
      classesCount: 22,
    },
  ],
  degrees: [
    {
      id: 'degree-001',
      degree: 'M.Sc. Mathematics',
      university: 'Delhi University',
      year: '2018',
    },
    {
      id: 'degree-002',
      degree: 'B.Ed.',
      university: 'Jamia Millia Islamia',
      year: '2020',
    },
    {
      id: 'degree-003',
      degree: 'B.Sc. Physics',
      university: 'University of Rajasthan',
      year: '2016',
    },
  ],
  upcomingClasses: [
    {
      id: 'upcoming-001',
      date: { day: '14', month: 'Jul' },
      subject: 'Calculus Revision',
      coaching: 'Bright Future Academy',
      room: 'Room 204',
      time: '10:00 AM - 11:30 AM',
    },
    {
      id: 'upcoming-002',
      date: { day: '15', month: 'Jul' },
      subject: 'Mechanics Practice',
      coaching: 'Scholars Point',
      room: 'Lab 2',
      time: '02:00 PM - 03:30 PM',
    },
    {
      id: 'upcoming-003',
      date: { day: '16', month: 'Jul' },
      subject: 'Algebra Test Review',
      coaching: 'Concept Lab Classes',
      room: 'Room 101',
      time: '05:00 PM - 06:00 PM',
    },
  ],
  announcements: [
    {
      id: 'announcement-001',
      title: 'Mock test schedule updated',
      description: 'Class 12 Physics mock test has moved to Friday afternoon.',
      time: '20 min ago',
    },
    {
      id: 'announcement-002',
      title: 'New study material uploaded',
      description: 'Differentiation worksheets are now available for all batches.',
      time: '2 hours ago',
    },
    {
      id: 'announcement-003',
      title: 'Parent meeting reminder',
      description: 'Monthly parent meetings start this Saturday at 11:00 AM.',
      time: 'Yesterday',
    },
  ],
};
