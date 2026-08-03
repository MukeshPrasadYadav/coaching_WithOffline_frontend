// src/services/StudentService.ts

import { api } from "../api/Client";
import { getPage, post } from "../api/response.utility";
import type { Gender } from "../store/auth.store";
import type { Address } from "../store/coaching.store";

export interface BatchRecord{
    id: string;
    batchName :string;
}
export interface Student{
    id ? : string;
    name : string;
    email : string;
    contactNumber : string;
     gender: Gender | null;

    batches : BatchRecord[];
}

export type CompleteStudentProfile = Omit<Student, "batches"> & {
  dob: string;
  fatherName: string;
  motherName: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  address : Address;
  };

export interface UpdareStudentDetails{
    contatNumber : string;
    parentNumber : string;
    parentEmail : string;
    address : Address;
}



export interface StudentResponse{
    id : string;
    name : string;
    email : string;
    contactNumber : string;
    gender: Gender | null;
    batches : BatchRecord[];
    joiningDate : string;
}

 export interface StudentFilter {
    search : string;
    batch : string;
    toDate : string;
    fromDate : string;
    pageNumber : number,
    pageSize : number
}

const root = "/students";
const StudentService = {

    addStudent : async (request : Student ) => await post<Student,StudentResponse>(`${root}`,request),

    getStudents : async(params : StudentFilter) => await getPage<StudentResponse,StudentFilter>(`${root}`,params),

    completeProfile : async(request : CompleteStudentProfile) => await post<CompleteStudentProfile,void>(`${root}/completeProfile`,request),

    updateStudentDetails : async(request : UpdareStudentDetails) => await post<UpdareStudentDetails,void>(`${root}/updateDetails`,request),



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
        
    } catch (error: unknown) {
        console.error("Export failed:", error);
        throw error; // or handle as per your error handling
    }
},
};


export default StudentService;