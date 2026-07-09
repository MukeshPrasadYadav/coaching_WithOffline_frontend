// src/Components/sideBars/CoachingSider.tsx
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";

import {
  Dashboard,
  School,
  Groups,
  MenuBook,
  Class,
  EventAvailable,
  Payments,
  Assessment,
  Settings,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

const drawerWidth = 260;

const menu = [
  {
    section: "ACADEMICS",
    items: [
      { text: "Dashboard", icon: <Dashboard />, path: "/home" },
      { text: "Students", icon: <School />, path: "/students" },
      { text: "Teachers", icon: <Groups />, path: "/teachers" },
      { text: "Courses", icon: <MenuBook />, path: "/courses" },
      { text: "Batches", icon: <Class />, path: "/batches" },
    ],
  },
  {
    section: "MANAGEMENT",
    items: [
      { text: "Attendance", icon: <EventAvailable />, path: "/attendance" },
      { text: "Fees", icon: <Payments />, path: "/fees" },
      { text: "Reports", icon: <Assessment />, path: "/reports" },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      { text: "Settings", icon: <Settings />, path: "/settings" },
    ],
  },
];

const CoachingSider = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          Coaching ERP
        </Typography>
      </Toolbar>

      <Divider />

      {menu.map((group) => (
        <Box key={group.section}>
          <Typography
            variant="caption"
            sx={{ px: 2, pt: 2, color: "text.secondary" }}
          >
            {group.section}
          </Typography>

          <List>
            {group.items.map((item) => (
              <ListItemButton
                key={item.text}
                component={NavLink}
                to={item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>

          <Divider />
        </Box>
      ))}
    </Drawer>
  );
};

export default CoachingSider;