// src/services/CoachingService.ts
import { api } from '../api/Client';
import type { Address, Coaching, CoachingInfo } from '../store/coaching.store';

export interface CoachingRequest {
  name: string;
  ownerName: string;
  ownerEmail: string;
  ownerContactNumber: string;

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
}

const CoachingService = {

    addCoaching : async (request : CoachingRequest)  => {

        const {data} = await api.post("/coaching",request);
        return data.data;

    } ,

    
  getCoaching: async (coachingId: string) => {
    const res = await api.get(`/coaching/${coachingId}`);
    return res.data.data;
  },

  updateCoachingAddress : async (coachingId: string , request :Address ) =>{
    const res = await api.patch(`/coaching/${coachingId}/updateAddress`,request);
    console.log("res",res.data)
    return res.data;
  },

  updateCoahingInfo : async (coachingId :string, request : CoachingInfo) =>{
    const res = await  api.patch(`/coaching/${coachingId}/updateInfo`,request);
    console.log("updated basic info",res.data);
    return res.data
    }
};


export default  CoachingService;