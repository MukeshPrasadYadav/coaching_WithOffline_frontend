// src/Components/PanelsWithForms/ManageTeacher.tsx
// src/Components/PanelsWithForms/TeacherForm.tsx
// src/Components/PanelsWithForms/TeacherForm.tsx
import { Form, Formik, getIn } from 'formik';
import CustomDrawer from '../ui/CustomDrawer';
import * as Yup from "yup";
import type { Address } from '../../store/coaching.store';
import { Autocomplete, Button, Divider, Grid, Stack, TextField, Typography, Chip, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useAddTeacherByAdmin } from '../../hooks/teacher.hooks';
import AddTeacherForm from '../../pages/teacher/AddTeacherForm';

type FormType = "Add" | "Update";
type TabsType = "Appoint" | "Add"

interface TeacherFormProps {
  type: FormType;
  open: boolean;
  teacherId: string | null;
  closeModal: () => void;
}



// Sample options - you can move these to constants or fetch from API
const commonSubjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Computer Science"];
const commonBatches = ["Morning", "Evening", "Weekend"];
const commonDegrees = ["B.Ed", "M.Sc", "B.Sc", "MA", "PhD", "B.A", "M.Ed"];

const commonExperice = ["All","1 + year","2+ year","5+ year"]

const ManageTeacher = ({ open, closeModal, teacherId }: TeacherFormProps) => {
  const [newDegree, setNewDegree] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newBatch, setNewBatch] = useState("");
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
    <Stack spacing={3} >

      {/* Search */}
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            fullWidth
            size="small"
            label="Search Teacher"
            placeholder="Search by name, email or mobile number"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ height: 40 }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Filters */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Autocomplete
            options={commonDegrees}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Degree"
                size="small"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Autocomplete
            options={commonSubjects}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Subject"
                size="small"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Autocomplete
            options={commonExperice}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Experience"
                size="small"
              />
            )}
          />
        </Grid>
      </Grid>

      <Divider />

      {/* Teacher List */}
      <Typography variant="subtitle2">
        Teachers
      </Typography>

      <Box
        sx={{
          height: 420,
          overflowY: "auto",
          pr: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Map teacher cards here later */}

        {/* {teachers.map((teacher) => (
            <TeacherCard
                key={teacher.id}
                teacher={teacher}
            />
        ))} */}

      </Box>

    </Stack>
  )
}
      {
        tab === "Add" &&
              <AddTeacherForm />

      }
      </Box>
      
    </CustomDrawer>
  );
};

export default ManageTeacher;