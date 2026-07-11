// src/hooks/coaching.hooks.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import CoachingService from "../services/CoachingService"
import { useCoachingStore, type Address, type CoachingInfo } from "../store/coaching.store"


export const useAddCoaching = () =>{
    const setCoaching = useCoachingStore(state => state.setCoaching);
     const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CoachingService.addCoaching,
        onSuccess: (data) =>{
          console.log("data after adding coaching",data)
            setCoaching(data);
            queryClient.setQueryData(['coaching'], data);
        }

    })

   
} 

 export const useGetCoaching = (coachingId: string) => {
  return useQuery({
    queryKey: ["coaching", coachingId],
    queryFn: () => CoachingService.getCoaching(coachingId),
    enabled: !!coachingId,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
};

export const useUpdateCoachingInfo = (coachingId: string) => {
  const queryClient = useQueryClient();
  const updateBsicInfo = useCoachingStore(state => state.setCoaching);

  return useMutation({
    mutationFn: (request: CoachingInfo) =>
      CoachingService.updateCoahingInfo(coachingId, request),

    onSuccess: (updatedCoaching) => {
      queryClient.setQueryData(
        ["coaching", coachingId],
        updatedCoaching,
        
      );
      updateBsicInfo(updatedCoaching)
    },
  });
};

export const useUpdateCoachingAddress = (coachingId:string) =>{
    const queryClient = useQueryClient();
  const updateBsicInfo = useCoachingStore(state => state.setCoaching);

  return useMutation({
    mutationFn: (request: Address) =>
      CoachingService.updateCoachingAddress(coachingId, request),

    onSuccess: (updatedCoaching) => {
      queryClient.setQueryData(
        ["coaching", coachingId],
        updatedCoaching,
        
      );
      updateBsicInfo(updatedCoaching)
    },
  });

}