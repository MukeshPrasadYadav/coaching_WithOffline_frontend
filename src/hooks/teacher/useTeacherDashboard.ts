// src/hooks/teacher/useTeacherDashboard.ts
import { useQuery } from '@tanstack/react-query';
import TeacherDashboardService from '../../services/TeacherDashboardService';

export const TEACHER_DASHBOARD_QUERY_KEY = ['teacher-dashboard'] as const;

export const useTeacherDashboard = () => {
  return useQuery({
    queryKey: TEACHER_DASHBOARD_QUERY_KEY,
    queryFn: TeacherDashboardService.getDashboard,
  });
};
