// src/services/UserService.ts

import type { Role, User } from '../store/auth.store';
import { api } from '../api/Client';
import type { UpdateProfileRequest } from '../hooks/user.hook';



const UserService = {

    updateUser: async (userId : string, payload : UpdateProfileRequest) =>{
        const res = await api.patch(`/user/${userId}`,payload);
        return res.data;
    }

};

export default UserService;