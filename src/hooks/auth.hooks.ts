// src/hooks/auth.hooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AuthService from '../services/AuthService';
import {  useAuthStore } from '../store/auth.store';
import {useNavigate } from 'react-router-dom';


export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: AuthService.login,

    onSuccess: async () => {
      const data = await AuthService.getCurrentUser();

      

      // IMPORTANT: pass data.user, not data
      setUser( data.user,);

      // Cache the complete API response
      queryClient.setQueryData(["user"], data);

      navigate("/home");
    },
  });
};

export const useSignUp =() =>{

  const navigate = useNavigate();
  return useMutation({
    mutationFn: AuthService.signup,
    onSuccess: async () =>{
      navigate("/login")
    }
  });

}

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: AuthService.getCurrentUser,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: false,
   
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.logout,

    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      navigate("/login");
    },
  });
};