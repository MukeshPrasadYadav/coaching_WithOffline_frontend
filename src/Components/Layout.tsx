// src/Components/Layout.tsx

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Navbar from "./ui/Navbar";
import Sidebar from "./ui/Sidebar";

const Layout = () => {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <div className="flex h-screen overflow-hidden bg-[rgb(var(--background))]">
      <Sidebar
        open={sidebarOpen}
        isDesktop={isDesktop}
        onClose={() => setSidebarOpen(false)}
      />

      {!sidebarOpen && (
        <IconButton
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
          sx={{
            position: "fixed",
            top: 14,
            left: 14,
            zIndex: 1400,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Main Content */}
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{
          transition: "all 200ms ease",
        }}
      >
        <Navbar reserveMenuSpace={!sidebarOpen} />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;