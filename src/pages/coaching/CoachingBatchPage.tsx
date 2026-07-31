// src/pages/coaching/CoachingBatchPage.tsx
// src/coaching/pages/Batch.tsx
import { Add, FilterList, Refresh, UploadFile } from "@mui/icons-material";
import { Button, Chip, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Role, useAuthStore } from "../../store/auth.store";
import BatchForm from "../../Components/PanelsWithForms/BatchForm";
import { useDebounce } from "../../hooks/debounce";
import type { BatchFilter } from "../../services/BatchService";
import {  useGetBatches } from "../../hooks/batch.hooks";
import BatchService from "../../services/BatchService";
import { SearchIcon } from 'lucide-react'


type ModalType = "AddBatch" | null;

interface ModalState{
  type: ModalType;
  params :{
    batchId : string
  };
}

const CoachingBatchPage = () => {

  const [searchInput, setSearchInput] = useState("");           
    const debouncedSearch = useDebounce(searchInput, 400);
  
  const [filter, setFilter] = useState<BatchFilter>({
      search: "",
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
    const user = useAuthStore((state) => state.user);
    const { data, refetch } = useGetBatches(filter);
    const batches = data?.content

    console.log("batches",data)
  
  

  const [modal,setModal] = useState<ModalState>({
    type: null,
    params :{
      batchId: ""
    }
  });
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div>
        <Typography variant="h4">Batches</Typography>
        <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
          Manage class groups, teacher assignments, and enrollment capacity.
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
      {/* command bar */}
      <div className="flex shrink-0 flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
          {user?.role === Role.ADMIN && 
          <Button
           startIcon= {<Add />}
           variant="contained"
           onClick={() => setModal({ type: "AddBatch" , params : {coachingId : ""}})}>
            Add Batch
          </Button>
          }
          <Button startIcon={<FilterList />} variant="outlined">
            Filter
          </Button>
          <Button
          onClick={() => refetch()}
           startIcon = {<Refresh />} variant="outlined">
            Refresh
          </Button>
          <Button
          onClick={() => BatchService.exportBatch(filter)}
           startIcon={<UploadFile />} variant="outlined">
            Export
          </Button>
        </div>
        {/* right side */}
        <div className="w-full md:w-[320px]">

          <TextField
              fullWidth
              size="small"
              placeholder="Search Batches..."
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
          <TableCell>Batch</TableCell>
          <TableCell>Teacher</TableCell>
          <TableCell >Students</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
       
        {batches?.map((batch) => (
          <TableRow key={batch?.name ?? ""} hover>
            <TableCell sx={{ fontWeight: 600 }}>{batch?.name ?? ""}</TableCell>
            <TableCell>{batch?.teachers ?? ""}</TableCell>
            <TableCell >{batch?.totalStudents}</TableCell>
            <TableCell>
              <Chip
                size="small"
                label={batch?.status}
                color={batch?.status === "Active" ? "success" : "warning"}
                variant="outlined"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

 <TablePagination
    count={data?.totalElements ?? 0}
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
  <BatchForm open = {modal.type === "AddBatch"} type="Add" batchId={null} closeModal={() => setModal({type: null , params:{batchId : ""}})} />
</div>


  )
}

export default CoachingBatchPage;
