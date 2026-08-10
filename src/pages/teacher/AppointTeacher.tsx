// src/pages/teacher/AppointTeacher.tsx
import { Autocomplete, Box, Grid, Stack, TablePagination, TextField, Typography } from '@mui/material';
import { useState, type ComponentProps } from 'react'
import { Experience, type AppointTeacherFilter } from '../../services/TeacherService';
import { useGetTeacherAppoint } from '../../hooks/teacher.hooks';
import TeacherCard from '../../Components/ui/TeacherCard';


const commonSubjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Computer Science"];

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

const AppointTeacher = () => {
    const [search,setSearch] = useState<string>("")
      const[filter,setFilter] = useState<AppointTeacherFilter>({
             search : "",
              degree: "",
              experience: Experience.ALL,
              subject: "",
               pageNumber: 0,
                pageSize: 10,
      });
    
     
      const {data,isPending} = useGetTeacherAppoint(filter);
    
      const teachers = (data?.content ?? []) as ComponentProps<typeof TeacherCard>["teacher"][];
  return (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: { xs: 2.5, sm: 3 },
      width: "100%",
      minWidth: 0,
      minHeight: { xs: 500, md: 620 },
      height: { md: "calc(100vh - 184px)" },
      maxHeight: 720,
      p: { xs: 2, sm: 3 },
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 3,
      bgcolor: "background.paper",
    }}
  >
    {/* Search */}
    <Box sx={{ width: "100%", maxWidth: 520, mx: "auto" }}>
        <TextField
          fullWidth
          size="small"
          label="Search Teacher"
          placeholder="Search by name, email or mobile number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilter((prev) => ({ ...prev, search, pageNumber: 0 }));
            }
          }}
        />
    </Box>

    {/* Filters */}
    <Grid container spacing={2} sx={{ width: "100%" }}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Autocomplete
          options={commonDegrees}
          value={filter.degree}
          onChange={(_, value) =>
            setFilter((prev) => ({ ...prev, degree: value ?? "", pageNumber: 0 }))
          }
          renderInput={(params) => <TextField {...params} label="Degree" size="small" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Autocomplete
          options={commonSubjects}
          value={filter.subject}
          onChange={(_, value) =>
            setFilter((prev) => ({ ...prev, subject: value ?? "", pageNumber: 0 }))
          }
          renderInput={(params) => <TextField {...params} label="Subject" size="small" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Autocomplete
          options={commonExperience}
          value={commonExperience.find((item) => item.value === filter.experience) ?? null}
          onChange={(_, option) =>
            setFilter((prev) => ({
              ...prev,
              experience: option?.value ?? Experience.ALL,
              pageNumber: 0,
            }))
          }
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="Experience" size="small" />}
        />
      </Grid>
    </Grid>

    {/* The list card owns both the scroll area and pagination, keeping its height stable. */}
    <Box
      sx={{
        flex: 1,
        minHeight: { xs: 420, md: 0 },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2.5,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: { xs: 2, sm: 2.5 },
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle1">Teacher List</Typography>
      </Box>

      <Stack
        spacing={2}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          p: { xs: 1.5, sm: 2 },
        }}
      >
        {isPending ? (
          <Typography>Loading...</Typography>
        ) : teachers?.length ? (
          teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ m: "auto", textAlign: "center" }}>
            No teachers found.
          </Typography>
        )}
      </Stack>

      <TablePagination
        component="div"
        count={data?.totalElements ?? 0}
        page={filter.pageNumber}
        rowsPerPage={filter.pageSize}
        onPageChange={(_, page) => setFilter((prev) => ({ ...prev, pageNumber: page }))}
        onRowsPerPageChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            pageSize: parseInt(e.target.value, 10),
            pageNumber: 0,
          }))
        }
        rowsPerPageOptions={[5, 10, 20]}
        sx={{
          flexShrink: 0,
          borderTop: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          ".MuiTablePagination-toolbar": {
            justifyContent: "flex-end",
            px: { xs: 1, sm: 2 },
            flexWrap: "wrap",
            rowGap: 0.5,
          },
        }}
      />
    </Box>
  </Box>
);
}

export default AppointTeacher
