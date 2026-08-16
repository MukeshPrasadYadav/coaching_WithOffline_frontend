// src/pages/coaching/CoachingBatchPage.tsx

import {
  Add,
  FilterList,
  Refresh,
  UploadFile,
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

import { useNavigate } from "react-router-dom";

import {
  AppTable,
  Button,
} from "../../Components/ui";

import BatchForm from "../../Components/PanelsWithForms/BatchForm";

import { useDebounce } from "../../hooks/debounce";


import BatchService from "../../services/BatchService";

import { useGetBatches } from "../../hooks/batch.hooks";

import {
  Role,
  useAuthStore,
} from "../../store/auth.store";

import type { TableColumn } from "../../Components/ui/Table";


type ModalType = "AddBatch" | null;

interface ModalState {
  type: ModalType;

  params: {
    batchId: string | null;
  };
}

interface BatchFilterState {
  search: string;
  fromDate: string;
  toDate: string;
  pageNumber: number;
  pageSize: number;
}



const CoachingBatchPage = () => {
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
    useState<BatchFilterState>({
      search: "",
      fromDate: "",
      toDate: "",
      pageNumber: 0,
      pageSize: 10,
    });



  const [modal, setModal] =
    useState<ModalState>({
      type: null,

      params: {
        batchId: null,
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



  const handleAddBatch = () => {
    setModal({
      type: "AddBatch",

      params: {
        batchId: null,
      },
    });
  };



  const handleCloseModal = () => {
    setModal({
      type: null,

      params: {
        batchId: null,
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
      width: "30%",

      render: (batch) => (
        <span
          className="cursor-pointer font-medium hover:underline"
          onClick={() =>
            navigate(
              `/batches/${batch.id}`
            )
          }
        >
          {batch.name || "—"}
        </span>
      ),
    },

    {
      id: "teachers",
      label: "Teacher",
      width: "30%",

      render: (batch) =>
        batch.teachers || "—",
    },

    {
      id: "totalStudents",
      label: "Students",
      width: "20%",

      render: (batch) =>
        batch.totalStudents ?? 0,
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
          Batches
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.75,
            color: "text.secondary",
          }}
        >
          Manage class groups, teacher
          assignments, student capacity,
          and batch status.
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

            {/* Add Batch */}

            {user?.role === Role.ADMIN && (
              <Button
                variant="primary"
                startIcon={<Add />}
                onClick={handleAddBatch}
              >
                Add Batch
              </Button>
            )}

       

            <Button
              variant="outline"
              startIcon={
                <FilterList />
              }
            >
              Filter
            </Button>

        

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

        

            {user?.role === Role.ADMIN && (
              <Button
                variant="outline"
                startIcon={
                  <UploadFile />
                }
                onClick={() =>
                  BatchService.exportBatch(
                    filter
                  )
                }
              >
                Export
              </Button>
            )}
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
            batch.id
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

  

      <BatchForm
        open={
          modal.type === "AddBatch"
        }
        type="Add"
        batchId={null}
        closeModal={
          handleCloseModal
        }
      />
    </Box>
  );
};

export default CoachingBatchPage;