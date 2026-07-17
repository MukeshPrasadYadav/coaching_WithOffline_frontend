// src/Components/ui/Navbar.tsx
import { useLogout } from "../../hooks/auth.hooks";
import { Button } from "./Button";
import { Bell, ChevronDown, LogOut, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Avatar, IconButton, InputAdornment, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useAuthStore } from "../../store/auth.store";

// src/Components/ui/Navbar.tsx
interface NavbarProps {
  reserveMenuSpace?: boolean;
}

export default function Navbar({ reserveMenuSpace = false }: NavbarProps) {
  const { mutate: logout, isPending } = useLogout();
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const pageTitle = useMemo(() => {
    const segment = location.pathname.split("/").filter(Boolean).at(-1) ?? "dashboard";
    if (segment === "home") return "Dashboard";
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
    <nav className="sticky top-0 z-50 h-[70px] border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div
        className="mx-auto flex h-full max-w-screen-2xl items-center justify-between gap-4 px-6"
        style={{ paddingLeft: reserveMenuSpace ? 72 : undefined }}
      >
        <div className="min-w-0">
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
            Admin / {pageTitle}
          </Typography>
          <h1 className="m-0 truncate text-[22px] font-bold leading-tight text-[rgb(var(--text-primary))]">
            {pageTitle}
          </h1>
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <TextField
            size="small"
            placeholder="Search"
            sx={{
              display: { xs: "none", md: "block" },
              width: 280,
              "& .MuiInputBase-root": { height: 40 },
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

          <Button
            variant="ghost"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{ minWidth: 0, gap: 1, px: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 13 }}>
              {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
            </Avatar>
            <span className="hidden max-w-28 truncate text-sm md:inline">{user?.name ?? "Admin"}</span>
            <ChevronDown size={16} />
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 180,
                  borderRadius: 2,
                  boxShadow: "0 6px 18px rgba(15,23,42,0.08)",
                },
              },
            }}
          >
            <MenuItem disabled sx={{ opacity: "1 !important", color: "text.secondary" }}>
              {user?.role ?? "Admin"}
            </MenuItem>
            <MenuItem disabled={isPending} onClick={handleLogOut}>
              <LogOut size={16} style={{ marginRight: 10 }} />
              Log out
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
