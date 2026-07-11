// src/hooks/teacher.hooks.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTeacherStore } from "../store/teacher.store";
import TeacherService from "../services/TeacherService";



export const useAddTeacher = () =>{
    const setTeacher = useTeacherStore(state => state.setTeacher);
     const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TeacherService.addTeacher,
        onSuccess: (data) =>{
          console.log("data after adding coaching",data)
            setTeacher(data);
            queryClient.setQueryData(['teacher'], data);
        }
    })
} 

export const useGetTeacher = (teacherId: string) => {
  return useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: () => TeacherService.getTeacher(teacherId),
    enabled: !!teacherId,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
};