// src/services/TeacherDashboardService.ts
import { dashboardMock } from '../mocks/dashboardMock';
import type { TeacherDashboard } from '../types/dashboard';

const TeacherDashboardService = {
  getDashboard: async (): Promise<TeacherDashboard> => {
    return Promise.resolve(dashboardMock);
  },
};

export default TeacherDashboardService;
