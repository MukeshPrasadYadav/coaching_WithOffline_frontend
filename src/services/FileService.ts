// src/services/FileService.ts

import axios from "axios";
import { post } from "../api/response.utility";

export interface PreSignedUrlRequest{
    subFolder : string;
    fileName : string;
    contentType : string;
}

export interface preSignedUrlResponse{
    key : string;
    url : string;
}

export interface UploadFileRequest{
    uploadUrl : string;
    file : File;
    contentType : string;
}

const root = "files";
const FileService ={

    getPresignedUrl : async(request : PreSignedUrlRequest) => await post<PreSignedUrlRequest,preSignedUrlResponse>(`${root}/pre-signed-url`,request),

    uploadFile: async ( uploadUrl: string,file: File, contentType: string ): Promise<void> => {
 await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": contentType,
      },
    });
  },
};


export default FileService;