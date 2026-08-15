// src/Components/Layout.tsx

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import {
  Box,
  IconButton,
} from "@mui/material";

import Navbar from "./ui/Navbar";
import Sidebar from "./ui/Sidebar";

const Layout = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (event: MediaQueryListEvent) => {
      const desktop = event.matches;

      setIsDesktop(desktop);
      setSidebarOpen(desktop);
    };

    // Initial state
    setIsDesktop(mediaQuery.matches);
    setSidebarOpen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
    

      <Sidebar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
        isDesktop={isDesktop}
      />


      <Box
        sx={{
          minWidth: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
     

        <Box
          component="header"
          sx={{
            height: {
              xs: 64,
              md: 72,
            },

            flexShrink: 0,

            borderBottom: "1px solid",
            borderColor: "divider",

            bgcolor: "background.paper",
          }}
        >
          <Navbar
            reserveMenuSpace={!isDesktop && !sidebarOpen}
          />
        </Box>


        {!isDesktop && !sidebarOpen && (
          <IconButton
            onClick={handleOpenSidebar}
            aria-label="Open menu"
            sx={{
              position: "fixed",

              left: 16,
              top: 12,

              zIndex: 1300,

              width: 40,
              height: 40,

              border: "1px solid",
              borderColor: "divider",

              borderRadius: 2.5,

              bgcolor: "background.paper",

              color: "text.primary",

              boxShadow:
                "0 4px 14px rgba(15, 23, 42, 0.08)",

              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Menu size={19} />
          </IconButton>
        )}

       

        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto",

            px: {
              xs: 2,
              sm: 3,
              md: 4,
              lg: 5,
            },

            py: {
              xs: 3,
              md: 4,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 1440,
              mx: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;