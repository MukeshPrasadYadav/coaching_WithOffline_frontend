// src/Components/PanelsWithForms/ManageTeacher.tsx
// src/Components/PanelsWithForms/TeacherForm.tsx
// src/Components/PanelsWithForms/TeacherForm.tsx

import CustomDrawer from '../ui/CustomDrawer';

import {  Box, Tabs, Tab,  } from '@mui/material';
import {  useState } from 'react';

import AddTeacherForm from '../../pages/teacher/AddTeacherForm';


import AppointTeacher from '../../pages/teacher/AppointTeacher';

type FormType = "Add" | "Update";
type TabsType = "Appoint" | "Add"

interface TeacherFormProps {
  type: FormType;
  open: boolean;
  teacherId: string | null;
  closeModal: () => void;
}



// Sample options - you can move these to constants or fetch from API




const ManageTeacher = ({ open, closeModal, teacherId }: TeacherFormProps) => {
  
  
  const [tab,setTab]= useState<TabsType>("Appoint")



  // Replace with your actual mutation hook
  // const { mutate: addTeacher, isPending } = useAddTeacher(closeModal);

  

  return (
    <CustomDrawer
      open={open}
      onClose={closeModal}
      title={"Manage Teachers"}
      size="lg"
      anchor="right"
    >
      <Tabs 
      value={tab}
      onChange={(_,value) => setTab(value)}
      >
        {/* Appoint teacher  */}
        <Tab label = "Appoint teacher" value = "Appoint" / >

        <Tab label = "Add teacher" value = "Add"/>

      </Tabs>
      <Box className ="mt-3">
      {
  tab === "Appoint" && (
    <AppointTeacher />
  )
}
      {
        tab === "Add" &&
              <AddTeacherForm closeModal={closeModal} open = {open} />

      }
      </Box>
      
    </CustomDrawer>
  );
};

export default ManageTeacher;