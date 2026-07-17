import {
  Divider,
  Drawer,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { ChevronRight } from "lucide-react";

const drawerWidth = 260;

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

const ParentSider = ({ open, isDesktop, onClose }: SiderProp) => {
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
          Parent
        </Typography>
        <IconButton aria-label="Close sidebar" onClick={onClose}>
          <ChevronRight />
        </IconButton>
      </DrawerHeader>
      <Divider />
    </Drawer>
  );
};

export default ParentSider;
