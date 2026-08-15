// src/services/AuthService.ts
// src/services/AuthService.ts
import type { User, Role } from '../store/auth.store';
import { get, post } from '../api/response.utility';

export interface SignInRequest{
    email : string;
    password : string;
}

export interface CompleteProfile {
    
}

export interface SignUpReqest extends SignInRequest{
    role : Role
}

const root = "auth";
const AuthService = {
    

    login: async(request : SignInRequest) => await post<SignInRequest,void>(`${root}/signin`, request),

    signup: async (request : SignUpReqest ) => await post<SignUpReqest,void>(`${root}/signup`, request),

    getCurrentUser: async () => await get<User>(`${root}/get/me`),

    

    logout : async () => await post(`${root}/signout`),

    refreshToken : async () => await post<void,void>(`${root}/refresh`)

}

export default AuthService;