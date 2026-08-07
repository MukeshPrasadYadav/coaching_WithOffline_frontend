// src/hooks/student.hook.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StudentService, { type StudentFilter } from "../services/StudentService";
import { api } from "../api/Client";


export const useAddStudent = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: StudentService.addStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });

            closeModal();
        },
    });
};


export const useCompleteStudentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: StudentService.completeProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUpdateStudentDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.updateStudentDetails,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useGetStudents = (params: StudentFilter) => {
  return useQuery({
    queryKey: ["students", params],
    queryFn: () => StudentService.getStudents(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
};

export const useExportStudents = () => {
  return useMutation({
    mutationFn: StudentService.exportStudents,
  });
};

export const useGetStudentById = (studentId: string) => {
  return useQuery({
    queryKey: ["student", studentId],
    queryFn: () => StudentService.getStudentById(studentId),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
}