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

export const useGetStudents = (params: StudentFilter) => {
  return useQuery({
    queryKey: ["students", params],
    queryFn: () => StudentService.getStudents(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
};