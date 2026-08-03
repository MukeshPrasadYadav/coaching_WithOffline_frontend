// src/hooks/fileUpload.hooks.ts

import { useMutation } from "@tanstack/react-query";
import type { PreSignedUrlRequest, UploadFileRequest } from "../services/FileService";
import FileService from "../services/FileService";


export const useGeneratePresignedUrl = () => {
  return useMutation({
    mutationFn: (request: PreSignedUrlRequest) =>
      FileService.getPresignedUrl(request),
  });
};

export const useUploadFile = () => {
    return useMutation({
        mutationFn: async ({uploadUrl, file, contentType} : UploadFileRequest) => {
            await FileService.uploadFile(uploadUrl, file, contentType);
        },
    });

}