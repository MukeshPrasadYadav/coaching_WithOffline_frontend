// src/Components/ui/Navbar.tsx

import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Avatar,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import {
  Bell,
  LogOut,
  Search,
} from "lucide-react";

import { useLogout } from "../../hooks/auth.hooks";
import { useAuthStore } from "../../store/auth.store";

import Button from "./Button";

interface NavbarProps {
  reserveMenuSpace?: boolean;
}

export default function Navbar({
  reserveMenuSpace = false,
}: NavbarProps) {
  const { mutate: logout, isPending } = useLogout();

  const user = useAuthStore((state) => state.user);

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const pageTitle = useMemo(() => {
    const segment =
      location.pathname
        .split("/")
        .filter(Boolean)
        .at(-1) ?? "dashboard";

    if (segment === "home") {
      return "Dashboard";
    }

    return segment
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }, [location.pathname]);

  const handleLogOut = () => {
    logout();
    setAnchorEl(null);
  };

  return (
    <nav className="h-full">
      <div
        className="mx-auto flex h-full max-w-screen-2xl items-center justify-between gap-4 px-6"
        style={{
          paddingLeft: reserveMenuSpace ? 72 : undefined,
        }}
      >
        {/* Left side */}
        <div className="min-w-0">
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            {user?.role ?? "Admin"} / {pageTitle}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              lineHeight: 1.3,
              mt: 0.25,
            }}
          >
            {pageTitle}
          </Typography>
        </div>

        {/* Right side */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Search */}
          <TextField
            size="small"
            placeholder="Search"
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
              width: 280,

              "& .MuiInputBase-root": {
                height: 40,
                borderRadius: 2.5,
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

          {/* Notifications */}
          <IconButton
            aria-label="Notifications"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2.5,
              height: 40,
              width: 40,
            }}
          >
            <Bell size={18} />
          </IconButton>

          {/* User menu button */}
          <Button
            variant="ghost"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{
              minWidth: 0,
              gap: 1,
              px: 1,
              borderRadius: 2.5,
            }}
          >
            <Avatar
              src={user?.profile_picture || undefined}
              alt={user?.name || "User"}
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.main",
              }}
            >
              {!user?.profile_picture &&
                user?.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Typography
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              {user?.name ?? "Admin"}
            </Typography>
          </Button>

          {/* User dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 180,
                  borderRadius: 2,
                  boxShadow:
                    "0 6px 18px rgba(15,23,42,0.08)",
                },
              },
            }}
          >
            <MenuItem
              disabled
              sx={{
                opacity: "1 !important",
                color: "text.secondary",
              }}
            >
              {user?.role ?? "Admin"}
            </MenuItem>

            <MenuItem
              disabled={isPending}
              onClick={handleLogOut}
            >
              <LogOut
                size={16}
                style={{
                  marginRight: 10,
                }}
              />

              Log out
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
}