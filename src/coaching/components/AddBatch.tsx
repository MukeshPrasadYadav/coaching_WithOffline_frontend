// src/coaching/components/AddBatch.tsx
import React from 'react'
import CustomDrawer from '../../Components/ui/CustomDrawer'

interface AddBatchProps{
    opean : boolean;
    coachingId : string;
    closeModel : () => void;
}

const AddBatch = ({opean,coachingId,closeModel} : AddBatchProps) => {
  return (
    <CustomDrawer open ={opean} onClose={closeModel} title='Add Batch' size='xl' anchor='right' >
        <div>

        </div>

    </CustomDrawer>
    )
}

export default AddBatch