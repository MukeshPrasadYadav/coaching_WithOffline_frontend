// src/coaching/pages/Batch.tsx
import { Add, Refresh } from "@mui/icons-material";
import { Button, InputAdornment, Paper, Table, TableContainer, TablePagination, TextField } from "@mui/material";
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
  
  

  const [modal,setModal] = useState<ModalState>({
    type: null,
    params :{
      coachingId: ""
    }
  });
  return (
    <div>
      {/* command bar */}
      <div className="flex flex-row justify-between">
        {/* left side */}
        <div className="flex flex-row gap-x-1">
          {user?.role === Role.ADMIN && 
          <Button
           startIcon= {<Add />}
           variant="text"
           onClick={() => setModal({ type: "AddBatch" , params : {coachingId : user.coachingIds[0]}})}>
            add
          </Button>
          }
          <Button startIcon = {<Refresh />} variant="text">
            Refresh
          </Button>
        </div>
        {/* right side */}
        <div className="flex flex-row gap-x-1">

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
      ...
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