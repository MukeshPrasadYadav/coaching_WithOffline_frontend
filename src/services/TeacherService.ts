// src/services/TeacherService.ts
import { api } from '../api/Client';


export interface TeacherRegisterRequest{
      name: string;
     email: string;
  contactNumber: string;

  address: {
    country: string;
    state: string;
    area: string;
    city: string;
    pinCode: string;
    postOffice: string;
    building: string;
    houseNo: string;
  };
  fee : number;
  subjects : string [];
  degrees : string[];

}

const TeacherService ={

    addTeacher : async (request : TeacherRegisterRequest) =>{
        const res = await api.post("/teacher",request);
        return res.data;
    },

    getTeacher : async (teacherId: string) =>  {
        const res = await api.get(`teacher/${teacherId}`);
        console.log("get api",res.data.data)
        return res.data.data;
    }
}

export default TeacherService;
