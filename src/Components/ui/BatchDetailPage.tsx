// src/Components/ui/BatchDetailPage.tsx
import React from 'react'
import { useParams } from 'react-router-dom';
import BatchInfoCard from './BatchInfoCard';
import { useGetBatchById } from '../../hooks/batch.hooks';

const BatchDetailPage = () => {
    const { batchId } = useParams();

    const { data : batch } = useGetBatchById(batchId ?? "");
    
    console.log("batch",batch)
  return (
    <div>
    <BatchInfoCard
  teacher={batch?.teachers ?? ""}
  coaching= { batch?.coachingName ?? ""}
  subject= {batch?.subjects ?? ""}
  room= {batch?.roomNo ?? "main room"}
  students={batch?.totalStudent ?? 0}
  startDate= {batch?.startDate ?? "Not decided yet"}
  endDate= {batch?.endDate ?? "Not decided yet"}
  schedule= {batch?.scheduled ?? ""}
  timing= {batch?.timing ?? ""}
 fees={batch?.fees != null ? "₹ " + batch.fees : ""}
/>
    </div>
  )
}

export default BatchDetailPage