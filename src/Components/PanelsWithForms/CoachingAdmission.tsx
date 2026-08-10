// src/Components/PanelsWithForms/CoachingAdmission.tsx
import React, { useState } from 'react'
import CustomDrawer from '../ui/CustomDrawer'


interface CoachingAdmissionProps {
  open: boolean;

  closeModal: () => void;
}
const CoachingAdmission = ({open,closeModal} : CoachingAdmissionProps) => {
 
  return (
    <CustomDrawer
          open={open}
          onClose={closeModal}
          title={"Manage Teachers"}
          size="lg"
          anchor="right"
     >
        <div>Hello</div>

    
    </CustomDrawer>
  )
}

export default CoachingAdmission
