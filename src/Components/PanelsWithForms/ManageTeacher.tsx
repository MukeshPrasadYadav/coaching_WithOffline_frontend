// src/Components/PanelsWithForms/ManageTeacher.tsx
// src/Components/PanelsWithForms/TeacherForm.tsx
// src/Components/PanelsWithForms/TeacherForm.tsx
import { Form, Formik, getIn } from 'formik';
import CustomDrawer from '../ui/CustomDrawer';
import * as Yup from "yup";
import type { Address } from '../../store/coaching.store';
import { Autocomplete, Button, Divider, Grid, Stack, TextField, Typography, Chip, Box, Tabs, Tab, TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAddTeacherByAdmin, useGetTeacherAppoint } from '../../hooks/teacher.hooks';
import AddTeacherForm from '../../pages/teacher/AddTeacherForm';
import { Experience, type AppointTeacherFilter, type AppointTeacherResponse } from '../../services/TeacherService';
import TeacherCard from '../ui/TeacherCard';

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

const commonExperience = [
  {
    label: "All",
    value: Experience.ALL,
  },
  {
    label: "1+ Year",
    value: Experience.ONE_YEAR_PLUS,
  },
  {
    label: "2+ Years",
    value: Experience.TWO_YEAR_PLUS,
  },
  {
    label: "5+ Years",
    value: Experience.FIVE_YEAR_PLUS,
  },
];



const ManageTeacher = ({ open, closeModal, teacherId }: TeacherFormProps) => {
  const [newDegree, setNewDegree] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newBatch, setNewBatch] = useState("");
  const [search,setSearch] = useState<string>("")
  const [tab,setTab]= useState<TabsType>("Appoint")

  const[filter,setFilter] = useState<AppointTeacherFilter>({
         search : "",
          degree: "",
          experience: Experience.ALL,
          subject: "",
           pageNumber: 0,
            pageSize: 10,
  });

  const handleChange = () =>{
   refetch();
  }
  const {data,isPending,refetch} = useGetTeacherAppoint(filter);

  const teachers = (data?.content ?? []);

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
    <Stack spacing={3}>
    {/* Search */}
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 10 }}>
        <TextField
          fullWidth
          size="small"
          label="Search Teacher"
          placeholder="Search by name, email or mobile number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilter((prev) => ({
                ...prev,
                search,
                pageNumber: 0,
              }));
            }
          }}
        />
      </Grid>

      
    </Grid>

    {/* Filters */}
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          options={commonDegrees}
          value={filter.degree}
          onChange={(_, value) =>
            setFilter((prev) => ({
              ...prev,
              degree: value ?? "",
              pageNumber: 0,
            }))
          }
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
          value={filter.subject}
          onChange={(_, value) =>
            setFilter((prev) => ({
              ...prev,
              subject: value ?? "",
              pageNumber: 0,
            }))
          }
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
  options={commonExperience}
  value={
    commonExperience.find(
      (item) => item.value === filter.experience
    ) ?? null
  }
  onChange={(_, option) =>
    setFilter((prev) => ({
      ...prev,
      experience: option?.value ?? Experience.ALL,
      pageNumber: 0,
    }))
  }
  getOptionLabel={(option) => option.label}
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
      {isPending ? (
        <Typography>Loading...</Typography>
      ) : teachers?.length ? (
        teachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
          />
        ))
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
        >
          No teachers found.
        </Typography>
      )}
    </Box>
    <TablePagination
    component="div"
    count={data?.totalElements ?? 0}
    page={filter.pageNumber}
    rowsPerPage={filter.pageSize}
    onPageChange={(_, page) =>
      setFilter((prev) => ({
        ...prev,
        pageNumber: page,
      }))
    }
    onRowsPerPageChange={(e) =>
      setFilter((prev) => ({
        ...prev,
        pageSize: parseInt(e.target.value, 10),
        pageNumber: 0,
      }))
    }
    rowsPerPageOptions={[5, 10, 20]}
  />
  </Stack>
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