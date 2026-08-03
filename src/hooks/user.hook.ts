// src/hooks/user.hook.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore, type User } from "../store/auth.store";
import UserService, { type UpdateProfilePictureRequest } from "../services/UserService";

export interface UpdateProfileRequest {
    name: string;
    email: string;
    contactNumber: string;
    address: {
        country: string;
        state: string;
        city: string;
        area: string;
        pinCode: string;
        postOffice?: string;
        building?: string;
        houseNo?: string;
    };
}

const user = useAuthStore.getState().user;

export const useUpdateUser = (userId:string) =>{
    const queryClient = useQueryClient();
  const updateUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: (request : UpdateProfileRequest) =>
      UserService.updateUser(userId,request),

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        ["user", userId],
        updatedUser,
        
      );
      updateUser(updatedUser)
    },
  });

}

export const useUpdateUserProfilePicture = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: UserService.updateUserProfilePicture,

    onSuccess: (updatedUser) => {
      console.log("Updated user profile picture:", updatedUser);
      queryClient.setQueryData(["user"], updatedUser);
      setUser(updatedUser);
    },
  });
};