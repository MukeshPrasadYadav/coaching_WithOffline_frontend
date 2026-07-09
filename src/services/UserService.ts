// src/services/UserService.ts

import type { Role, UserBasicInfo } from '../store/auth.store';
import { api } from '../api/Client';



const UserService = {

    updateBasicInfo: async (userId : string, payload : UserBasicInfo) =>{
        const res = await api.patch(`/user/${userId}`,payload);
        return res.data;
    }

};

export default UserService;