import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Users,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useLogout } from "../../hooks/auth.hooks";

const drawerWidth = 260;

export interface SiderProp {
  open: boolean;
  isDesktop: boolean;
  onClose: () => void;
}

const menu = [
  {
    section: "Workspace",
    items: [
      {
        text: "Dashboard",
        icon: LayoutDashboard,
        path: "/home",
      },
      {
        text: "Students",
        icon: GraduationCap,
        path: "/students",
      },
      {
        text: "Teachers",
        icon: Users,
        path: "/teachers",
      },
      {
        text: "Batches",
        icon: BookOpen,
        path: "/batches",
      },
    ],
  },
];

const CoachingSider = ({
  open,
  isDesktop,
  onClose,
}: SiderProp) => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",

          display: "flex",
          flexDirection: "column",

          borderRight: "1px solid",
          borderColor: "divider",

          bgcolor: "background.paper",
          color: "text.primary",
        },
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <Box
        sx={{
          height: 72,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: 800,
              letterSpacing: "-0.01em",
              color: "text.primary",
            }}
          >
            CoachingHub
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "text.secondary",
            }}
          >
            Management System
          </Typography>
        </Box>

        {/* Mobile close button */}

        {!isDesktop && (
          <IconButton
            onClick={onClose}
            aria-label="Close sidebar"
            size="small"
            sx={{
              color: "text.secondary",
              borderRadius: 2,

              "&:hover": {
                bgcolor: "action.hover",
                color: "text.primary",
              },
            }}
          >
            <X size={18} />
          </IconButton>
        )}
      </Box>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",

          px: 1.25,
          py: 2,

          "&::-webkit-scrollbar": {
            width: 5,
          },

          "&::-webkit-scrollbar-thumb": {
            bgcolor: "action.disabled",
            borderRadius: 10,
          },
        }}
      >
        {menu.map((group) => (
          <Box key={group.section}>
            {/* Section title */}

            <Typography
              variant="caption"
              sx={{
                display: "block",

                px: 1.25,
                mb: 0.75,

                color: "text.disabled",

                fontSize: "0.68rem",
                fontWeight: 700,

                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {group.section}
            </Typography>

            {/* Navigation items */}

            <List
              disablePadding
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <ListItemButton
                    key={item.text}
                    component={NavLink}
                    to={item.path}
                    onClick={
                      !isDesktop ? onClose : undefined
                    }
                    sx={{
                      minHeight: 44,

                      px: 1.25,

                      borderRadius: 2,

                      color: "text.secondary",

                      transition:
                        "background-color 160ms ease, color 160ms ease",

                      "&:hover": {
                        bgcolor: "action.hover",
                        color: "text.primary",
                      },

                      "&.active": {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",

                        boxShadow:
                          "0 4px 12px rgba(91, 75, 219, 0.18)",

                        "& .MuiListItemIcon-root": {
                          color: "inherit",
                        },

                        "& .nav-arrow": {
                          opacity: 1,
                          transform: "translateX(0)",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: "inherit",
                      }}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                          }}
                        >
                          {item.text}
                        </Typography>
                      }
                    />

                    <ChevronRight
                      className="nav-arrow"
                      size={15}
                      style={{
                        opacity: 0,
                        transform:
                          "translateX(-4px)",
                        transition:
                          "opacity 160ms ease, transform 160ms ease",
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Box
        sx={{
          px: 1.25,
          py: 1.5,

          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <ListItemButton
          disabled={isPending}
          onClick={handleLogout}
          sx={{
            minHeight: 44,

            px: 1.25,

            borderRadius: 2,

            color: "text.secondary",

            "&:hover": {
              bgcolor: "action.hover",
              color: "error.main",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: "inherit",
            }}
          >
            <LogOut size={18} />
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography
                component="span"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {isPending ? "Logging out..." : "Logout"}
              </Typography>
            }
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default CoachingSider;