// src/pages/otherPages/CoachingTeachers.tsx

import { Add, Refresh } from '@mui/icons-material'
import { Button, InputAdornment, Table, TableContainer, TablePagination, TextField } from '@mui/material'
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Role, useAuthStore } from '../../store/auth.store'

type ModalType = "AddStudent" | "UpdateStudent" |  "RemoveStudent" |null;

interface ModalState{
  type: ModalType;
  params :{
    coachingId : string
  };
}

const CoachingTeachers = () => {
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
           onClick ={ () => console.log("button pressed")}>
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
</div>


  )
}

export default CoachingTeachers