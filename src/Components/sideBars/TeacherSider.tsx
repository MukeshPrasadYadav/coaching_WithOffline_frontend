// src/Components/sideBars/TeacherSider.tsx

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  IconButton,
  styled,
} from "@mui/material";

import {
  Dashboard,
  Groups,
  Subject,
  AccountBalance,
  People,
  Event,
  Assignment,
  AssignmentTurnedIn,
  ChatBubble,
  CurrencyRupee,
  Person,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";
import { BookOpen, ChevronRight, LayoutDashboard, LogOut, User } from "lucide-react";
import { useLogout } from "../../hooks/auth.hooks";

const drawerWidth = 260

interface SiderProp {
  open: boolean;
  isDesktop: boolean;
  onClose: () => void;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
}));

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
        text: "Profile",
        icon: User,
        path: "/profile",
      },
      {
        text: "My Batch",
        icon: BookOpen,
        path: "/batches",
      }
      
      
    ],
  },
  // {
  //   section: "System",
  //   items: [
  //     {
  //       text: "Settings",
  //       icon: Settings,
  //       path: "/student/settings",
  //     },
  //   ],
  // },
];


const TeacherSider = ({ open, isDesktop, onClose }: SiderProp) => {

    const { mutate: logout, isPending } = useLogout();
  
  
  
     return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: 0,
          bgcolor: "#0F172A",
          color: "#CBD5E1",
          px: 1.5,
        },
      }}
    >
      <DrawerHeader>
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            Student Portal
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: 12,
            }}
          >
            Learning Dashboard
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            color: "#CBD5E1",
            display: isDesktop ? "none" : "inline-flex",
          }}
        >
          <ChevronRight size={20} />
        </IconButton>
      </DrawerHeader>

      {menu.map((group) => (
        <Box key={group.section} sx={{ mt: 1 }}>
          <Typography
            variant="caption"
            sx={{
              px: 1.5,
              py: 1,
              display: "block",
              color: "#64748B",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {group.section}
          </Typography>

          <List>
            {group.items.map((item) => (
              <ListItemButton
                key={item.text}
                component={NavLink}
                to={item.path}
                onClick={!isDesktop ? onClose : undefined}
                sx={{
                  minHeight: 42,
                  borderRadius: 2.5,
                  color: "#CBD5E1",
                  mb: 0.25,
                  px: 1.5,

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#fff",
                  },

                  "&.active": {
                    bgcolor: "#1E40AF",
                    color: "#fff",

                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                  },
                }}
              >
                                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 36,
                  }}
                >
                  <item.icon size={19} />
                </ListItemIcon>


                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      ))}

      <Box sx={{ mt: "auto", py: 2 }}>
        <ListItemButton
          disabled={isPending}
          onClick={() => logout()}
          sx={{
            minHeight: 42,
            borderRadius: 2.5,
            color: "#CBD5E1",

            "&:hover": {
              bgcolor: "rgba(255,255,255,0.08)",
              color: "#fff",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "inherit",
              minWidth: 36,
            }}
          >
            <LogOut size={19} />
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography
                component="span"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Logout
              </Typography>
            }
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
  
}

export default TeacherSider
