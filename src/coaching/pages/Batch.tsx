// src/coaching/pages/Batch.tsx
import { Add, FilterList, Refresh, UploadFile } from "@mui/icons-material";
import { Button, Chip, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { Role, useAuthStore } from "../../store/auth.store";
import AddBatch from "../components/AddBatch";


type ModalType = "AddBatch" | null;

interface ModalState{
  type: ModalType;
  params :{
    coachingId : string
  };
}

const Batch = () => {
    const user = useAuthStore((state) => state.user);
  
  const rows = [
    { name: "Class XII Science", teacher: "Dr. Mehta", students: 42, status: "Active" },
    { name: "Class XI Foundation", teacher: "Anita Rao", students: 36, status: "Active" },
    { name: "JEE Weekend", teacher: "Rohit Sen", students: 28, status: "Review" },
    { name: "NEET Chemistry", teacher: "Priya Nair", students: 31, status: "Active" },
  ];
  

  const [modal,setModal] = useState<ModalState>({
    type: null,
    params :{
      coachingId: ""
    }
  });
  return (
    <div className="space-y-5">
      <div>
        <Typography variant="h4">Batches</Typography>
        <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
          Manage class groups, teacher assignments, and enrollment capacity.
        </Typography>
      </div>
      {/* command bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
        {/* left side */}
        <div className="flex flex-wrap gap-2">
          {user?.role === Role.ADMIN && 
          <Button
           startIcon= {<Add />}
           variant="contained"
           onClick={() => setModal({ type: "AddBatch" , params : {coachingId : "ancd"}})}>
            Add Batch
          </Button>
          }
          <Button startIcon={<FilterList />} variant="outlined">
            Filter
          </Button>
          <Button startIcon = {<Refresh />} variant="outlined">
            Refresh
          </Button>
          <Button startIcon={<UploadFile />} variant="outlined">
            Export
          </Button>
        </div>
        {/* right side */}
        <div className="w-full md:w-[320px]">

          <TextField
      fullWidth
      size="small"
      placeholder="Search..."
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />

        </div>

      </div>
  <TableContainer sx={{ maxHeight: 600 }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Batch</TableCell>
          <TableCell>Teacher</TableCell>
          <TableCell align="right">Students</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name} hover>
            <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
            <TableCell>{row.teacher}</TableCell>
            <TableCell align="right">{row.students}</TableCell>
            <TableCell>
              <Chip
                size="small"
                label={row.status}
                color={row.status === "Active" ? "success" : "warning"}
                variant="outlined"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  <TablePagination
    rowsPerPageOptions={[10, 25, 50]}
    component="div"
    count={10}
    rowsPerPage={10}
    page={0}
    onPageChange={()=>""}
    onRowsPerPageChange={() =>""}
  />
  <AddBatch opean= {modal.type === "AddBatch"} coachingId= {modal.params.coachingId ?? ""} closeModel={() => setModal({type: null,params:{coachingId:""}})} />
</div>


  )
}

export default Batch;
