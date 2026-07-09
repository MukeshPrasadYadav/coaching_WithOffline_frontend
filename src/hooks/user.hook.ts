// src/hooks/user.hook.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore, type UserBasicInfo } from "../store/auth.store";
import UserService from "../services/UserService";


export const useUpdateUserBasicInfo = (userId:string) =>{
    const queryClient = useQueryClient();
  const updateBsicInfo = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: (request : UserBasicInfo) =>
      UserService.updateBasicInfo(userId,request),

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        ["user", userId],
        updatedUser,
        
      );
      updateBsicInfo(updatedUser)
    },
  });

}