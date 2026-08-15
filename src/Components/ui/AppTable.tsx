// src/Components/ui/Table.tsx

import type { ReactNode } from "react";

import {
  CircularProgress,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

export interface TableColumn<T> {
  id: string;
  label: string;
  accessor?: keyof T;
  render?: (row: T) => ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
}

export interface AppTableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];

  getRowId: (row: T) => string | number;

  loading?: boolean;
  error?: boolean;

  emptyMessage?: string;
  errorMessage?: string;

  onRowClick?: (row: T) => void;

  pagination?: boolean;

  count?: number;
  page?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];

  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;

  onRowsPerPageChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function AppTable<T>({
  columns,
  rows,
  getRowId,

  loading = false,
  error = false,

  emptyMessage = "No records found.",
  errorMessage = "Unable to load data.",

  onRowClick,

  pagination = false,

  count = 0,
  page = 0,
  rowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50],

  onPageChange,
  onRowsPerPageChange,
}: AppTableProps<T>) {
  const isEmpty =
    !loading &&
    !error &&
    rows.length === 0;

  return (
    <>
      <TableContainer
        sx={{
          width: "100%",

          overflowX: "auto",

          "&::-webkit-scrollbar": {
            width: 6,
            height: 6,
          },

          "&::-webkit-scrollbar-thumb": {
            bgcolor: "action.disabled",
            borderRadius: 10,
          },
        }}
      >
        <MuiTable
          stickyHeader
          sx={{
            width: "100%",
            minWidth: 650,
          }}
        >
          {/* ================================
              HEADER
          ================================= */}

          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    width: column.width,

                    bgcolor: "background.paper",

                    color: "text.secondary",

                    fontSize: "0.72rem",
                    fontWeight: 700,

                    letterSpacing: "0.04em",
                    textTransform: "uppercase",

                    borderBottom: "1px solid",
                    borderColor: "divider",

                    py: 1.5,

                    whiteSpace: "nowrap",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* ================================
              BODY
          ================================= */}

          <TableBody>
            {/* Loading */}

            {loading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{
                    py: 8,
                    borderBottom: 0,
                  }}
                >
                  <CircularProgress
                    size={24}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            )}

            {/* Error */}

            {!loading && error && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{
                    py: 8,
                    borderBottom: 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {errorMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}

            {isEmpty && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{
                    py: 8,
                    borderBottom: 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* Data */}

            {!loading &&
              !error &&
              rows.map((row) => (
                <TableRow
                  key={getRowId(row)}
                  hover
                  onClick={
                    onRowClick
                      ? () => onRowClick(row)
                      : undefined
                  }
                  sx={{
                    cursor: onRowClick
                      ? "pointer"
                      : "default",

                    "&:last-child td": {
                      borderBottom: 0,
                    },

                    "&:hover": onRowClick
                      ? {
                          bgcolor: "action.hover",
                        }
                      : undefined,
                  }}
                >
                  {columns.map((column) => {
                    let value: ReactNode = null;

                    if (column.render) {
                      value = column.render(row);
                    } else if (
                      column.accessor
                    ) {
                      value = row[
                        column.accessor
                      ] as ReactNode;
                    }

                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          py: 1.5,

                          color: "text.primary",

                          fontSize: "0.875rem",

                          borderColor: "divider",
                        }}
                      >
                        {value ?? "—"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {/* ================================
          PAGINATION
      ================================= */}

      {pagination && (
        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={onPageChange}
          onRowsPerPageChange={
            onRowsPerPageChange
          }
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",

            minHeight: 56,

            ".MuiTablePagination-toolbar": {
              minHeight: 56,
              px: 1,
            },

            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              {
                fontSize: "0.8rem",
                color: "text.secondary",
              },
          }}
        />
      )}
    </>
  );
}

AppTable.displayName = "AppTable";

export default AppTable;