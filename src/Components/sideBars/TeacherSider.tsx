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
import { ChevronRight } from "lucide-react";

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

const TeacherSider = ({ open, isDesktop, onClose }: SiderProp) => {
  
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
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <DrawerHeader>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Coaching ERP
            </Typography>
            <IconButton aria-label="Close sidebar" onClick={onClose}>
              <ChevronRight />
            </IconButton>
          </DrawerHeader>
    
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
                    onClick={!isDesktop ? onClose : undefined}
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
