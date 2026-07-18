// src/services/StudentService.ts

import { api, toPageResponse, type PageResponse } from "../api/Client";
import type { Address } from "../store/coaching.store";

export interface Student{
    id ? : string;
    name : string;
    email : string;
    contactNumber : string;
    parentName : string;
    parentNumber : string;
    parentEmail ? : string;
    address : Address;
    class_std : string;
    batch : string;
}

export interface StudentResponse{
    id : string;
    name : string;
    class_std : string;
    batch : string;
    joiningDate : string;
}

 export interface StudentFilter {
    search : string;
    class_std : string;
    batch : string;
    toDate : string;
    fromDate : string;
    pageNumber : number,
    pageSize : number
}


const StudentService = {

    addStudent : async (request : Student ) =>{

        const res = await api.post("/students",request);
        console.log("added student response",res.data);
        return res.data.data;

    },

    getStudents: async (
    params: StudentFilter
): Promise<PageResponse<StudentResponse>> => {

    const res = await api.get("/students", { params });

    return toPageResponse<StudentResponse>(res.data.data)

    
},

// Add this method
exportStudents: async (params : StudentFilter): Promise<void> => {
    try {
        const response = await api.get("/students/export",  {
            params,
            responseType: 'blob',           // ← This is crucial
        });

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        
        link.href = url;
        link.setAttribute('download', 'students.xlsx');   // filename
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
};


export default StudentService;