// src/pages/otherPages/CoachingTeachers.tsx

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

import ManageTeacher from "../../Components/PanelsWithForms/ManageTeacher";

import { useGetTeachers } from "../../hooks/teacher.hooks";

import TeacherService, {
  type TeacherFilter,
} from "../../services/TeacherService";

import type { BatchRecord } from "../../services/StudentService";

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
  | "AddTeacher"
  | "UpdateTeacher"
  | "RemoveTeacher"
  | null;

interface ModalState {
  type: ModalType;

  params: {
    teacherId: string | null;
  };
}

export interface Teacher {
  id: string;
  name: string;
  contactNumber?: string;
  email?: string;
  degrees?: string[];
  experience?: number | "";
  batches?: BatchRecord[];
  subjects?: string[];
}

type TeacherRow = Teacher & {
  joiningDate?: string;
};

// ==========================================================
// COMPONENT
// ==========================================================

const CoachingTeachers = () => {
  const navigate = useNavigate();

  // ========================================================
  // AUTH
  // ========================================================

  const user = useAuthStore(
    (state) => state.user
  );

  // ========================================================
  // SEARCH
  // ========================================================

  const [searchInput, setSearchInput] =
    useState("");

  const debouncedSearch = useDebounce(
    searchInput,
    400
  );

  // ========================================================
  // FILTER
  // ========================================================

  const [filter, setFilter] =
    useState<TeacherFilter>({
      search: "",
      subject: "",
      degree: "",
      batch: "",
      fromDate: "",
      toDate: "",
      pageNumber: 0,
      pageSize: 10,
    });

  // ========================================================
  // MODAL
  // ========================================================

  const [modal, setModal] =
    useState<ModalState>({
      type: null,

      params: {
        teacherId: null,
      },
    });

  // ========================================================
  // SEARCH DEBOUNCE
  // ========================================================

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,

      search: debouncedSearch,

      pageNumber: 0,
    }));
  }, [debouncedSearch]);

  // ========================================================
  // GET TEACHERS
  // ========================================================

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetTeachers(filter);

  const teachers =
    (data?.content ?? []) as TeacherRow[];

  // ========================================================
  // SEARCH HANDLER
  // ========================================================

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  // ========================================================
  // ADD TEACHER
  // ========================================================

  const handleAddTeacher = () => {
    setModal({
      type: "AddTeacher",

      params: {
        teacherId: null,
      },
    });
  };

  // ========================================================
  // CLOSE MODAL
  // ========================================================

  const handleCloseModal = () => {
    setModal({
      type: null,

      params: {
        teacherId: null,
      },
    });
  };

  // ========================================================
  // PAGE CHANGE
  // ========================================================

  const handlePageChange = (
    _event: MouseEvent | null,
    newPage: number
  ) => {
    setFilter((prev) => ({
      ...prev,

      pageNumber: newPage,
    }));
  };

  // ========================================================
  // ROWS PER PAGE
  // ========================================================

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

  // ========================================================
  // TABLE COLUMNS
  // ========================================================

  const columns: TableColumn[] = [
    {
      id: "name",
      label: "Name",
      accessor: "name",
      width: "30%",
    },

    {
      id: "batch",
      label: "Batch",
      width: "25%",

      render: (teacher) =>
        teacher.batches
          ?.map(
            (batch) => batch.batchName
          )
          .join(", ") || "—",
    },

    {
      id: "experience",
      label: "Experience",
      width: "20%",

      render: (teacher) => {
        if (
          teacher.experience === undefined ||
          teacher.experience === null ||
          teacher.experience === ""
        ) {
          return "—";
        }

        return `${teacher.experience} ${
          teacher.experience === 1
            ? "year"
            : "years"
        }`;
      },
    },

    {
      id: "joiningDate",
      label: "Joining Date",
      width: "25%",

      render: (teacher) =>
        teacher.joiningDate
          ? new Date(
              teacher.joiningDate
            ).toLocaleDateString("en-GB")
          : "—",
    },
  ];

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* ====================================================
          PAGE HEADER
      ==================================================== */}

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "text.primary",
          }}
        >
          Teachers
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.75,
            color: "text.secondary",
          }}
        >
          Manage teachers, assigned batches,
          experience, and joining details.
        </Typography>
      </Box>

      {/* ====================================================
          MAIN CONTENT CARD
      ==================================================== */}

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
        {/* ==================================================
            TOOLBAR
        ================================================== */}

        <div className="mb-5 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">

          {/* ================================================
              LEFT — ACTION BUTTONS
          ================================================= */}

          <div className="flex flex-wrap items-center gap-2">

            {/* Add Teacher */}

            {user?.role === Role.ADMIN && (
              <Button
                variant="primary"
                startIcon={<Add />}
                onClick={handleAddTeacher}
              >
                Add Teacher
              </Button>
            )}

            {/* Filter */}

            <Button
              startIcon={<FilterList />}
              variant="outline"
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
                  TeacherService.exportTeachers(
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

          {/* ================================================
              RIGHT — SEARCH
          ================================================= */}

          <div className="w-full md:w-[320px] md:flex-shrink-0">
            <TextField
              fullWidth
              size="small"
              placeholder="Search teachers..."
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
                      <Search size={17} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        </div>

        {/* ==================================================
            TEACHERS TABLE
        ================================================== */}

        <AppTable<TeacherRow>
          columns={columns}
          rows={teachers}

          getRowId={(teacher) =>
            teacher.id
          }

          loading={isLoading}

          error={Boolean(error)}

          errorMessage="Unable to load teachers."

          emptyMessage="No teachers found."

          onRowClick={(teacher) =>
            navigate(
              `/teachers/${teacher.id}`
            )
          }

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

  

      <ManageTeacher
        open={
          modal.type === "AddTeacher"
        }

        type="Add"

        teacherId={null}

        closeModal={
          handleCloseModal
        }
      />
    </Box>
  );
};

export default CoachingTeachers;