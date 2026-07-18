// src/pages/otherPages/CoachingTeachers.tsx

import { Add, FilterList, Refresh, UploadFile } from '@mui/icons-material'
import { Button, CircularProgress, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Role, useAuthStore } from '../../store/auth.store'
import { useDebounce } from '../../hooks/debounce'
import type { StudentFilter } from '../../services/StudentService'
import TeacherForm from '../../Components/PanelsWithForms/TeacherForm'
import { useExportTeachers, useGetTeachers } from '../../hooks/teacher.hooks'
import type { TeacherFilter } from '../../services/TeacherService'
import TeacherService from '../../services/TeacherService'

type ModalType = "AddTeacher" | "UpdateTeacher" |  "RemoveTeacher" |null;

interface ModalState{
  type: ModalType;
  params :{
    teacherId : string
  };
}

export interface Teacher{
  id: string;
  name : string;
  contactNumber ?: string;
    email ?: string;
    degrees ?: string[];
    experience ?: number | '';
    batches?: string[];
    subjects ?: string[];
}

type TeacherRow = Teacher & {
  joiningDate?: string;
};

const CoachingTeachers = () => {
        const user = useAuthStore((state) => state.user);

        
        const [searchInput, setSearchInput] = useState("");           
          const debouncedSearch = useDebounce(searchInput, 400);
        
        const [filter, setFilter] = useState<TeacherFilter>({
            search: "",
            subject: "",
            degree: "",
            batch: "",
            fromDate: "",
            toDate: "",
            pageNumber: 0,
            pageSize: 10,
        });
        
        useEffect(() => {
            setFilter(prev => ({
              ...prev,
              search: debouncedSearch,
              pageNumber: 0,           
            }));
          }, [debouncedSearch]);
      
      const { data, isLoading, error, refetch } = useGetTeachers(filter);

      const teachers = (data?.items ?? []) as TeacherRow[];
    
      const [modal,setModal] = useState<ModalState>({
        type: null,
        params :{
          teacherId: ""
        }
      });

       const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
    
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0">
        <Typography variant="h4">Teachers</Typography>
        <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
          Manage teacher records, batches, and joining details.
        </Typography>
      </div>

      <Paper
        sx={{
          mt: 2,
          p: 3,
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 4,
          boxShadow: "0 4px 16px rgba(15,23,42,0.06)",
        }}
      >
        <div className="flex shrink-0 flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {user?.role === Role.ADMIN &&
            <Button
             startIcon= {<Add />}
             variant="contained"
             onClick ={ () => setModal({type : "AddTeacher" , params: {teacherId : ""}})}>
              Add Teacher
            </Button>
            
            }
            <Button startIcon={<FilterList />} variant="outlined">
                        Filter
                      </Button>
            <Button onClick={() => refetch()} startIcon = {<Refresh />} variant="outlined">
              Refresh
            </Button>
            

            {user?.role === Role.ADMIN && 
            <Button
           onClick={() => TeacherService.exportTeachers(filter)}
             startIcon={<UploadFile />} variant="outlined">
             Export
            </Button>}
          </div>

          <div className="w-full md:w-[320px]">
            <TextField
              fullWidth
              size="small"
              placeholder="Search students..."
              value={searchInput}                    // ← controlled by immediate input
              onChange={handleSearchChange}
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon size={17} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        </div>

        <TableContainer
          sx={{
            mt: 2,
            flex: 1,
            minHeight: 0,
            height: "calc(100vh - 70px - 48px - 52px - 16px - 48px - 40px - 16px - 53px)",
            overflowY: "auto",
          }}
        >
          <Table stickyHeader>

            <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Joining Date</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && error && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8, color: "text.secondary" }}>
                    Unable to load teachers.
                  </TableCell>
                </TableRow>
               )} 

              {!isLoading && !error && teachers.map((teacher) => (
                <TableRow key={teacher.id} hover>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.batches}</TableCell>
                    <TableCell>{teacher.experience}</TableCell>
                    <TableCell>
                        {teacher.joiningDate ? new Date(teacher.joiningDate).toLocaleDateString() : "-"}
                    </TableCell>
                </TableRow>

            ))}
          </TableBody>
          </Table>
        </TableContainer>

<TablePagination
    count={data?.totalItems ?? 0}
    page={filter.pageNumber}
    rowsPerPage={filter.pageSize}
    rowsPerPageOptions={[10, 25, 50]}
    onPageChange={(_, newPage) => {
        setFilter(prev => ({
            ...prev,
            pageNumber: newPage,
        }));
    }}
    onRowsPerPageChange={(event) => {
        setFilter(prev => ({
            ...prev,
            pageSize: Number(event.target.value),
            pageNumber: 0,
        }));
    }}
/>    
 </Paper>
<TeacherForm open={modal.type === "AddTeacher" } type= "Add" teacherId={null} closeModal={() => setModal({type : null , params :{teacherId : ""}})}/>
  
</div>


  )
}

export default CoachingTeachers