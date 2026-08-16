// src/services/AuthService.ts
// src/services/AuthService.ts
import type { User, Role, Gender } from '../store/auth.store';
import { get, post } from '../api/response.utility';

export interface SignInRequest{
    email : string;
    password : string;
}

export interface Address{
    country: string;
    state: string;
    city: string;
    area: string;
    pinCode: string;
    postOffice: string;
    building: string;
    houseNo: string;
}

interface BaseProfile {
    name: string;
  email: string;
  contactNumber: string;
  gender: Gender;
  dob: string;
  address: Address;
  role : Role
}

export interface teacherProfile extends BaseProfile{
    degrees?: string[];
    subjects?: string[];
}

export interface studentProfile extends BaseProfile{
    motherName ? : string;
    fatherName? : string,

     parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
}

export interface Admin{
    id : string;
     ownerName: string;
    ownerEmail: string;
     ownerContactNumber: string;   
     profile : BaseProfile
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