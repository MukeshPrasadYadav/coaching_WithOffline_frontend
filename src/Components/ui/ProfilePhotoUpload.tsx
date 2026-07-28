// src/Components/ui/ProfilePhotoUpload.tsx
import {
  Button,
  Stack,
  Typography,
} from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

interface Props {
  image?: string;
}

export default function ProfilePhotoUpload({
  image,
}: Props) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
    >
      <div className="w-44 h-44 rounded-2xl border-2 border-dashed border-blue-300 flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            className="w-full h-full object-cover"
          />
        ) : (
          <PhotoCameraOutlinedIcon
            color="primary"
            sx={{ fontSize: 45 }}
          />
        )}
      </div>

      <Button variant="contained">
        Upload Photo
      </Button>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        JPG, PNG (Max. 2MB)
      </Typography>
    </Stack>
  );
}