// src/Components/sideBars/TeacherSider.tsx

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

const menu = [
  {
    section: "ACADEMICS",
    
    items: [
      { text: "Dashboard", icon: <Dashboard />, path: "/" },
      { text: "My classes", icon: <Subject />, path: "/" },
      { text: "Subjects", icon: <Groups />, path: "/" },
      { text: "Coachng centers", icon: <AccountBalance />, path: "/" },
      { text: "Students", icon: <People />, path: "/" },
      { text: "Schedule", icon: <Event />, path: "/" },
      { text: "Assignments", icon: <Assignment />, path: "/" },
      { text: "Attendace", icon: <AssignmentTurnedIn />, path: "/" },
      { text: "Messages", icon: <ChatBubble />, path: "/" },
      { text: "Earnings", icon: <CurrencyRupee />, path: "/" },
      { text: "Profile", icon: <Person />, path: "/teacherProfile" }

    ],
  }
];

const drawerWidth = 260

const TeacherSider = () => {
  
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
  
}

export default TeacherSider