// src/services/TeacherService.ts
import type { Params } from 'react-router-dom';
import { api} from '../api/Client';
import { get, getPage, post } from '../api/response.utility';
import type { TeacherRegisterRequest } from '../pages/teacher/AddTeacherForm';
import type { Gender } from '../store/auth.store';
import type { Address } from '../store/coaching.store';


export interface CompleteTeacherProfile{
      name: string;
     email: string;
  contactNumber: string;
  gender: Gender | null;

  address: Address;
  fee ? : number;
  subjects ? : string [];
  degrees ?: string[];
  batches ?: string[];
  experience ?: number,
  dob : string;

}

export interface TeacherFilter{
    search : string;
    subject : string;
    degree : string;
    batch : string;
    toDate : string;
    fromDate : string;
    pageNumber : number,
    pageSize : number
}
export const Experience = {
  ALL: "ALL",
  ONE_YEAR_PLUS: "ONE_YEAR_PLUS",
  TWO_YEAR_PLUS: "TWO_YEAR_PLUS",
  FIVE_YEAR_PLUS: "FIVE_YEAR_PLUS",
} as const;

export type Experience =
  typeof Experience[keyof typeof Experience];

export interface TeacherResponse{
    id : string;
    name : string;
    experience : number;
    joiningDate : string;

}
export interface AppointTeacherFilter{
    search : string;
    degree: string;
    experience: Experience;
    subject:string;
    pageNumber : number;
    pageSize : number
}

export interface AppointTeacherResponse{
    id: string;
    name: string;
    avatar?: string;
    degree: string;
    subject: string;
    experience: Experience;

}

const root = "/teacher";
const TeacherService ={

    completeProfile : async (request : CompleteTeacherProfile) => await post<CompleteTeacherProfile,void>(`${root}/completeProfile`,request),

    getTeacher : async (params: TeacherFilter) => await getPage<TeacherResponse,TeacherFilter>(`${root}`,params),

    addTeacherByAdmin : async (request : TeacherRegisterRequest) => await post<TeacherRegisterRequest,void>(`${root}`,request),


   

    exportTeachers: async (params : TeacherFilter): Promise<void> => {
        try {
            const response = await api.get("/teacher/export",  {
                params,
                responseType: 'blob',           // ← This is crucial
            });
    
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            
            link.href = url;
            link.setAttribute('download', 'teachers.xlsx');   // filename
            document.body.appendChild(link);
            link.click();
    
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
        } catch (error: any) {
            console.error("Export failed:", error);
            throw error; // or handle as per your error handling
        }
    },

    getTeacherByCoachng : async (coachigId : string) =>{
        const res = await api.get(`teacher/coaching/${coachigId}`);
        return res.data.data;
    },

    

    getAllTeacherForAppointment : async (params : AppointTeacherFilter) => {
        const res = await api.get(`teacher/appoint`,{params});
        console.log("teachers",res.data)
        return res.data.data;
    }
}

export default TeacherService;
