// src/services/TeacherService.ts
import { api, toPageResponse, type PageResponse } from '../api/Client';
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

export interface TeacherResponse{
    id : string;
    name : string;
    experience : number;
    joiningDate : string;

}
export interface AppointTeacherFilter{
    search : string;
    degrees: string;
    experience: string;
    subjects:string;
}

const TeacherService ={

    completeProfile : async (request : CompleteTeacherProfile) =>{
        const res = await api.post("/teacher/completeProfile",request);
        return res.data;
    },

    getTeacher : async (params: TeacherFilter): Promise<PageResponse<TeacherResponse>> =>  {
        const res = await api.get(`teacher`,{params});
         return toPageResponse<TeacherResponse>(res.data.data)
    },

    addTeacherByAdmin : async (request : TeacherRegisterRequest) =>{
        const res = await api.post("/teacher",request);
        return res.data.data;
    },

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
