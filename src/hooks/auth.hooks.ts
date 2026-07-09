// src/hooks/auth.hooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AuthService from '../services/AuthService';
import { useAuthStore } from '../store/auth.store';
import {useNavigate } from 'react-router-dom';


export const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: async () =>{
        const user = await AuthService.getCurrentUser();
        setUser(user);
        queryClient.setQueryData(['user'], user);
        navigate('/home'); 
    }
  });
}

export const useSignUp =() =>{

  const navigate = useNavigate();
  return useMutation({
    mutationFn: AuthService.signup,
    onSuccess: async (data) =>{
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
    retry: 1,
    onSuccess: (data: any) => {
      console.log('Fetched user:', data);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout: logoutFromStore } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      logoutFromStore();
      queryClient.clear(); 
      navigate("/login")
    },
  });
};