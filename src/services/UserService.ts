// src/services/UserService.ts


import { api } from '../api/Client';
import { post, put } from '../api/response.utility';
import type { UpdateProfileRequest } from '../hooks/user.hook';
import type { User } from '../store/auth.store';


export interface UpdateProfilePictureRequest{
    s3Url : string | null;
}

const UserService = {

    updateUser: async (userId : string, payload : UpdateProfileRequest) =>{
        const res = await api.patch(`/user/${userId}`,payload);
        return res.data;
    },

    updateUserProfilePicture : async (request : UpdateProfilePictureRequest) => post<UpdateProfilePictureRequest,User>(`/user/profile-picture`,request),

};

export default UserService;