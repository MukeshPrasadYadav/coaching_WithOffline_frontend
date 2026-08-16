// src/hooks/teacher.hooks.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTeacherStore } from "../store/teacher.store";
import TeacherService, { type AppointTeacherFilter, type TeacherFilter } from "../services/TeacherService";



export const useCompleteTeacherProfile = () =>{
    const setTeacher = useTeacherStore(state => state.setTeacher);
     const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TeacherService.completeProfile,
        onSuccess: (data) =>{
          console.log("data after adding coaching",data)
            setTeacher(data);
            queryClient.setQueryData(['teacher'], data);
        }
    })
} 

export const useAddTeacherByAdmin = (closeModal : () => void
) =>{
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TeacherService.addTeacherByAdmin,
       onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["teachers"],
            });

            closeModal();
        },
    })
}

export const useGetTeachers = (params: TeacherFilter) => {
  return useQuery({
    queryKey: ["teachers", params],
    queryFn: () => TeacherService.getTeacher(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
};

export const useGetTeacherAppoint = (params : AppointTeacherFilter) =>{
  return useQuery({
    queryKey: ["teachers", params],
    queryFn: () => TeacherService.getAllTeacherForAppointment(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
};

export const useGetTeacherByCoaching = (coachingId : string, enabled :boolean) =>{

    return useQuery({
        queryKey : ["teachers",coachingId],
        queryFn : () => TeacherService.getTeacherByCoachng(coachingId),
        enabled: Boolean(coachingId) && enabled,
        staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
    })
}



export const useExportTeachers = () => {
  return useMutation({
    mutationFn: TeacherService.exportTeachers,
  });
};