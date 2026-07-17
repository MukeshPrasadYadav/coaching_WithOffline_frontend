// src/Components/sideBars/CoachingSider.tsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  styled,
  IconButton,
} from "@mui/material";

import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarCheck,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  ReceiptIndianRupee,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/auth.hooks";

const drawerWidth = 260;

 export interface SiderProp{
  open: boolean;
  isDesktop: boolean;
  onClose: () => void;
}

const menu = [
  {
    section: "Workspace",
    items: [
      { text: "Dashboard", icon: LayoutDashboard, path: "/home" },
      { text: "Students", icon: GraduationCap, path: "/students" },
      { text: "Teachers", icon: Users, path: "/teachers" },
      { text: "Attendance", icon: CalendarCheck, path: "/attendance" },
      { text: "Batches", icon: BookOpen, path: "/batches" },
    ],
  },
  {
    section: "Management",
    items: [
      { text: "Fees", icon: ReceiptIndianRupee, path: "/fees" },
      { text: "Exams", icon: Bell, path: "/exams" },
      { text: "Messages", icon: MessageSquare, path: "/messages" },
      { text: "Reports", icon: BarChart3, path: "/reports" },
    ],
  },
  {
    section: "System",
    items: [
      { text: "Settings", icon: Settings, path: "/settings" },
    ],
  },
];

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(2),
}));

const CoachingSider = ({ open, isDesktop, onClose } : SiderProp) => {
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
      <DrawerHeader sx={{ justifyContent: "space-between", minHeight: 70, px: 1 }}>
        <Box>
          <Typography sx={{ color: "#FFFFFF", fontWeight: 700, fontSize: 17, lineHeight: 1 }}>
            Coaching Admin
          </Typography>
          <Typography sx={{ color: "#94A3B8", fontSize: 12, mt: 0.75 }}>
            Management System
          </Typography>
        </Box>
        <IconButton
          aria-label="Close sidebar"
          onClick={onClose}
          sx={{
            color: "#CBD5E1",
            display: isDesktop ? "none" : "inline-flex",
            "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
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
              display: "block",
              px: 1.5,
              py: 1,
              color: "#64748B",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {group.section}
          </Typography>

          <List sx={{ py: 0.25 }}>
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
                  transition: "background-color 180ms ease, color 180ms ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#FFFFFF",
                  },
                  "&.active": {
                    bgcolor: "#1E40AF",
                    color: "#FFFFFF",
                    "& .MuiListItemIcon-root": { color: "#FFFFFF" },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                  <item.icon size={19} />
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Typography component="span" sx={{ fontSize: 14, fontWeight: 500 }}>
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
            px: 1.5,
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.08)",
              color: "#FFFFFF",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
            <LogOut size={19} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography component="span" sx={{ fontSize: 14, fontWeight: 500 }}>
                Logout
              </Typography>
            }
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default CoachingSider;
