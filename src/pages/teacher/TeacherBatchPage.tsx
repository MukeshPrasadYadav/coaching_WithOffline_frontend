// src/pages/teacher/TeacherBatchPage.tsx

import {
  Add,
  FilterList,
  Refresh,
} from "@mui/icons-material";

import {
  Box,
  Chip,
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

import {
  AppTable,
  Button,
} from "../../Components/ui";

import {
  Role,
  useAuthStore,
} from "../../store/auth.store";

import { useDebounce } from "../../hooks/debounce";

import type { BatchFilter } from "../../services/BatchService";

import { useGetBatches } from "../../hooks/batch.hooks";

import CoachingAdmission from "../../Components/PanelsWithForms/CoachingAdmission";

import type { TableColumn } from "../../Components/ui/Table";


type ModalType = "Admission" | null;

interface ModalState {
  type: ModalType;
}



const TeacherBatchPage = () => {


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
    useState<BatchFilter>({
      search: "",
      fromDate: "",
      toDate: "",
      pageNumber: 0,
      pageSize: 10,
    });



  const [modal, setModal] =
    useState<ModalState>({
      type: null,
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
  } = useGetBatches(filter);

  const batches =
    data?.content ?? [];



  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(
      event.target.value
    );
  };

  

  const handleAdmission = () => {
    setModal({
      type: "Admission",
    });
  };



  const handleCloseModal = () => {
    setModal({
      type: null,
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
      pageSize: Number(
        event.target.value
      ),
      pageNumber: 0,
    }));
  };


  const columns: TableColumn[] = [
    {
      id: "name",
      label: "Batch",
      accessor: "name",
      width: "25%",
    },

    {
      id: "totalStudents",
      label: "Total Students",
      width: "25%",

      render: (batch) =>
        batch.totalStudents ?? 0,
    },

    {
      id: "coachingName",
      label: "Coaching",
      width: "30%",

      render: (batch) =>
        batch.coachingName || "—",
    },

    {
      id: "status",
      label: "Status",
      width: "20%",

      render: (batch) => (
        <Chip
          size="small"
          label={
            batch.status || "Unknown"
          }
          color={
            batch.status === "Active"
              ? "success"
              : "warning"
          }
          variant="outlined"
        />
      ),
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
          My Coachings
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.75,
            color: "text.secondary",
          }}
        >
          Manage class groups, teacher
          assignments, and enrollment
          capacity.
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

            {/* Admission */}

            {user?.role === Role.TEACHER && (
              <Button
                variant="primary"
                startIcon={<Add />}
                onClick={handleAdmission}
              >
                Admission
              </Button>
            )}

            {/* Filter */}

            <Button
              variant="outline"
              startIcon={
                <FilterList />
              }
            >
              Filter
            </Button>

            {/* Refresh */}

            <Button
              variant="outline"
              startIcon={
                <Refresh />
              }
              onClick={() =>
                refetch()
              }
            >
              Refresh
            </Button>
          </div>

       

          <div className="w-full md:w-[320px] md:flex-shrink-0">
            <TextField
              fullWidth
              size="small"
              placeholder="Search batches..."
              value={searchInput}
              onChange={
                handleSearchChange
              }
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

    

        <AppTable
          columns={columns}
          rows={batches}
          getRowId={(batch) =>
            batch.id ??
            batch.name
          }
          loading={isLoading}
          error={Boolean(error)}
          errorMessage="Unable to load batches."
          emptyMessage="No batches found."
          pagination
          count={
            data?.totalElements ?? 0
          }
          page={filter.pageNumber}
          rowsPerPage={
            filter.pageSize
          }
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

    

      <CoachingAdmission
        open={
          modal.type === "Admission"
        }
        closeModal={
          handleCloseModal
        }
      />
    </Box>
  );
};

export default TeacherBatchPage;