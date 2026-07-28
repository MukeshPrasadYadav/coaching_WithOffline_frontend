// src/hooks/batch.hooks.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BatchService, { type BatchFilter } from "../services/BatchService";



export const useAddBatch = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: BatchService.addBatch,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["batch"],
            });

            closeModal();
        },
    });
};

export const useGetBatchForEnroll = () => {
  return useQuery({
    queryKey: ["batch"],
    queryFn: BatchService.getBatchForEnroll,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
};

export const useGetBatches = (params: BatchFilter) => {
  return useQuery({
    queryKey: ["batch", params],
    queryFn: () => BatchService.getBatch(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
};

export const useExportBatch = () => {
  return useMutation({
    mutationFn: BatchService.exportBatch,
  });
};