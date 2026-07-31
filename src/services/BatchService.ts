// src/services/BatchService.ts

import { api} from '../api/Client';
import type { Dayjs } from 'dayjs';
import {  getPage, post } from '../api/response.utility';



export interface BatchFilter{
    search : string;
    toDate : string;
    fromDate : string;
    pageNumber : number,
    pageSize : number
}

export interface BatchResponse{
    id : string;
    name : string;
    totalStudents? : number;
    teachers?: string[];
    startTime : string;
    endTime : string;
    status : string;
    coachingName ?: string;
}

export interface AddBatchRequest {
  name: string;
  startDate: string;
  endDate: string;
  fee: number | "";
  teachers: number[];
  subjects: number[];
  startTime: Dayjs | null;
  endTime : Dayjs | null;
  description: string;
}

const root = "batch";

const BatchService = {

    addBatch: async ({coachingId,request} : {coachingId: string,request : AddBatchRequest}) => await post<{coachingId: string,request : AddBatchRequest},BatchResponse>(`${root}/${coachingId}`,request),
    

    getBatch : async (params : BatchFilter) => await getPage<BatchResponse,BatchFilter>(`/${root}`,params),

    
   

    getBatchForEnroll : async() =>{
        const res = await api.get(`/${root}/getBatchForEnroll`);
        console.log("response of batch for enrol",res.data.data)
        return res.data.data;
    },

    exportBatch: async (params : BatchFilter): Promise<void> => {
        try {
            const response = await api.get(`/${root}/export`,  {
                params,
                responseType: 'blob',           // ← This is crucial
            });
    
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            
            link.href = url;
            link.setAttribute('download', 'batch.xlsx');   // filename
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

export default BatchService;