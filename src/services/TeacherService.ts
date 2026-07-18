// src/services/TeacherService.ts
import { api, toPageResponse, type PageResponse } from '../api/Client';


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
  fee ? : number;
  subjects ? : string [];
  degrees ?: string[];
  batches ?: string[];
  experience ?: number

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

const TeacherService ={

    addTeacher : async (request : TeacherRegisterRequest) =>{
        const res = await api.post("/teacher",request);
        return res.data;
    },

    getTeacher : async (params: TeacherFilter): Promise<PageResponse<TeacherResponse>> =>  {
        const res = await api.get(`teacher`,{params});
         return toPageResponse<TeacherResponse>(res.data.data)
    },

    addTeacherByAdmin : async (request : TeacherRegisterRequest) =>{
        const res = await api.post("/teacher/addTeacher",request);
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
}

export default TeacherService;
