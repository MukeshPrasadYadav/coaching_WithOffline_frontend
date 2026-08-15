// src/pages/otherPages/CoachingStudents.tsx

import {
  Add,
  FilterList,
  Refresh,
  UploadFile,
} from "@mui/icons-material";

import {
  Box,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { Search } from "lucide-react";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  AppTable,
  Button,
} from "../../Components/ui";

import StudentForm from "../../Components/PanelsWithForms/StudentForm";

import { useGetStudents } from "../../hooks/student.hook";

import StudentService, {
  type Student,
} from "../../services/StudentService";

import { useDebounce } from "../../hooks/debounce";

import {
  Role,
  useAuthStore,
} from "../../store/auth.store";

import type { TableColumn } from "../../Components/ui/Table";

// ==========================================================
// TYPES
// ==========================================================

type ModalType =
  | "AddStudent"
  | "UpdateStudent"
  | "RemoveStudent"
  | null;

interface ModalState {
  type: ModalType;
  params: {
    studentId: string | null;
  };
}

interface StudentFilter {
  search: string;
  batch: string;
  fromDate: string;
  toDate: string;
  pageNumber: number;
  pageSize: number;
}

type StudentRow = Student & {
  joiningDate?: string;
};



const CoachingStudents = () => {
  const navigate = useNavigate();



  const user = useAuthStore(
    (state) => state.user
  );



  const [searchInput, setSearchInput] =
    useState("");

  const debouncedSearch = useDebounce(
    searchInput,
    400
  );



  const [filter, setFilter] =
    useState<StudentFilter>({
      search: "",
      batch: "",
      fromDate: "",
      toDate: "",
      pageNumber: 0,
      pageSize: 10,
    });


  const [modal, setModal] =
    useState<ModalState>({
      type: null,
      params: {
        studentId: null,
      },
    });



  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      search: debouncedSearch,
      pageNumber: 0,
    }));
  }, [debouncedSearch]);



  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetStudents(filter);

  const students =
    (data?.content ?? []) as StudentRow[];


  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };



  const handleAddStudent = () => {
    setModal({
      type: "AddStudent",
      params: {
        studentId: null,
      },
    });
  };



  const handleCloseModal = () => {
    setModal({
      type: null,
      params: {
        studentId: null,
      },
    });
  };


  const handlePageChange = (
    _event: MouseEvent | null,
    newPage: number
  ) => {
    setFilter((prev) => ({
      ...prev,
      pageNumber: newPage,
    }));
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFilter((prev) => ({
      ...prev,
      pageSize: Number(event.target.value),
      pageNumber: 0,
    }));
  };



  const columns: TableColumn[] = [
    {
      id: "name",
      label: "Name",
      accessor: "name",
      width: "35%",
    },

    {
      id: "batch",
      label: "Batch",
      width: "35%",

      render: (student) =>
        student.batches
          ?.map(
            (batch) => batch.batchName
          )
          .join(", ") || "—",
    },

    {
      id: "joiningDate",
      label: "Joining Date",
      width: "30%",

      render: (student) =>
        student.joiningDate
          ? new Date(
              student.joiningDate
            ).toLocaleDateString("en-GB")
          : "—",
    },
  ];

 

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
    

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "text.primary",
          }}
        >
          Students
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.75,
            color: "text.secondary",
          }}
        >
          Manage student records, batches,
          and joining details.
        </Typography>
      </Box>

 

      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,

          p: {
            xs: 2,
            md: 2.5,
          },

          boxShadow:
            "0 4px 16px rgba(15, 23, 42, 0.05)",
        }}
      >
   

        <div className="mb-5 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">



          <div className="flex flex-wrap items-center gap-2">

            {/* Add Student */}

            {user?.role === Role.ADMIN && (
              <Button
                variant= "primary"
                startIcon={<Add />}
                onClick={handleAddStudent}
              >
                Add Student
              </Button>
            )}

            {/* Filter */}

            <Button
              startIcon={<FilterList />}
              variant= "outline"
            >
              Filter
            </Button>

            {/* Refresh */}

            <Button
              onClick={() => refetch()}
              startIcon={<Refresh />}
              variant="outline"
            >
              Refresh
            </Button>

            {/* Export */}

            {user?.role === Role.ADMIN && (
              <Button
                onClick={() =>
                  StudentService.exportStudents(
                    filter
                  )
                }
                startIcon={<UploadFile />}
                variant="outline"
              >
                Export
              </Button>
            )}
          </div>

          

          <div className="w-full md:w-[320px] md:flex-shrink-0">
            <TextField
              fullWidth
              size="small"
              placeholder="Search students..."
              value={searchInput}
              onChange={handleSearchChange}
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                  borderRadius: "8px",
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search
                        size={17}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        </div>

        

        <AppTable<StudentRow>
          columns={columns}
          rows={students}
          getRowId={(student) =>
            student.id
          }
          loading={isLoading}
          error={Boolean(error)}
          errorMessage="Unable to load students."
          emptyMessage="No students found."
          onRowClick={(student) =>
            navigate(
              `/students/${student.id}`
            )
          }
          pagination
          count={
            data?.totalElements ?? 0
          }
          page={filter.pageNumber}
          rowsPerPage={filter.pageSize}
          rowsPerPageOptions={[
            10,
            25,
            50,
          ]}
          onPageChange={
            handlePageChange
          }
          onRowsPerPageChange={
            handleRowsPerPageChange
          }
        />
      </Box>

      

      <StudentForm
        open={
          modal.type === "AddStudent"
        }
        type="Add"
        studentId={null}
        closeModal={
          handleCloseModal
        }
      />
    </Box>
  );
};

export default CoachingStudents;