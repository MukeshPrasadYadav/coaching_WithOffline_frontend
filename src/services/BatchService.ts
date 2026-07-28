// src/services/BatchService.ts

import type dayjs from 'dayjs';
import { api, toPageResponse, type PageResponse } from '../api/Client';
import type { AddBatchRequest } from '../Components/PanelsWithForms/BatchForm';



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
    totalStudents : number;
    teachers : string[];
    startTime : string;
    endTime : string;
    status : string;

}

const api_perfix = "batch";

const BatchService = {
    

    addBatch: async ({coachingId,request} : {coachingId: string,request : AddBatchRequest}) =>{
        const res = await api.post(`/${api_perfix}/${coachingId}`,request);
        console.log("result of batch",res.data)
        return res.data;

    },

    getBatch: async (
        params: BatchFilter
    ): Promise<PageResponse<BatchResponse>> => {
    
        const res = await api.get(`/${api_perfix}`, { params });
    
        return toPageResponse<BatchResponse>(res.data.data)
    
        
    },

    getBatchForEnroll : async() =>{
        const res = await api.get(`/${api_perfix}/getBatchForEnroll`);
        console.log("response of batch for enrol",res.data.data)
        return res.data.data;
    },

    exportBatch: async (params : BatchFilter): Promise<void> => {
        try {
            const response = await api.get(`/${api_perfix}/export`,  {
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
            
        } catch (error: any) {
            console.error("Export failed:", error);
            throw error; // or handle as per your error handling
        }
    },

    


};

export default BatchService;