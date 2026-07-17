// src/pages/otherPages/CoachingStudents.tsx
import { Add, FilterList, Refresh, UploadFile } from '@mui/icons-material'
import { Button, CircularProgress, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Role, useAuthStore } from '../../store/auth.store'
import StudentForm from '../../Components/PanelsWithForms/StudentForm'
import { useGetStudents } from '../../hooks/student.hook'
import { type StudentFilter, type Student } from '../../services/StudentService'
import { useDebounce } from '../../hooks/debounce'

type ModalType = "AddStudent" | "UpdateStudent" |  "RemoveStudent" | null;

interface ModalState{
  type: ModalType;
  params :{
    studentId : string | null
  };
}

type StudentRow = Student & {
  joiningDate?: string;
};

const CoachingStudents = () => {

const [searchInput, setSearchInput] = useState("");           // ← immediate input
  const debouncedSearch = useDebounce(searchInput, 400);

const [filter, setFilter] = useState<StudentFilter>({
    search: "",
    class_std: "",
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
      pageNumber: 0,           // reset to first page on new search
    }));
  }, [debouncedSearch]);



const { data, isLoading, error, refetch } = useGetStudents(filter);
        const user = useAuthStore((state) => state.user);

 


console.log("data in student page",data)
      
      
    
      const [modal,setModal] = useState<ModalState>({
        type: null,
        params :{
          studentId: null
        }
      });

      const students = (data?.items ?? []) as StudentRow[];
      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

    
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0">
        <Typography variant="h4">Students</Typography>
        <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
          Manage student records, batches, and joining details.
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
             onClick ={ () => setModal({type :"AddStudent" , params :{studentId : null}})}>
              Add Student
            </Button>
            
            }
            <Button startIcon={<FilterList />} variant="outlined">
                        Filter
                      </Button>
            <Button onClick={() => refetch()} startIcon = {<Refresh />} variant="outlined">
              Refresh
            </Button>
            

            {user?.role === Role.ADMIN && 
            <Button startIcon={<UploadFile />} variant="outlined">
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
              <TableCell>Class</TableCell>
              <TableCell>Batch</TableCell>
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
                    Unable to load students.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && !error && students.map((student) => (
                <TableRow key={student.id} hover>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class_std}</TableCell>
                    <TableCell>{student.batch}</TableCell>
                    <TableCell>
                        {student.joiningDate ? new Date(student.joiningDate).toLocaleDateString() : "-"}
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

  <StudentForm open={modal.type === "AddStudent" } type= "Add" studentId={null} closeModal={() => setModal({type : null , params :{studentId : ""}})}/>
</div>


  )
}

export default CoachingStudents
