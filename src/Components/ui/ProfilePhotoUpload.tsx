// src/Components/ui/ProfilePhotoUpload.tsx
import {
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import axios from "axios";
import { useRef, useState } from "react";
import { post } from "../../api/response.utility";
import { useGeneratePresignedUrl, useUploadFile } from "../../hooks/fileUpload.hooks";
import { useUpdateUserProfilePicture } from "../../hooks/user.hook";
import { useAuthStore } from "../../store/auth.store";

interface ProfilePhotoUploadProps {
  subFolder?: string;
  fileName?: string;
  entityId: string;
  currentImage?: string;
  onUploaded?: (url: string) => void;
}

interface PresignedResponse {
  uploadUrl: string;
  fileUrl: string;
  objectKey: string;
}

export default function ProfilePhotoUpload({
  subFolder,
  fileName,
  currentImage,
  onUploaded,
}: ProfilePhotoUploadProps) {
  const { mutateAsync: generatePresignedUrl } =useGeneratePresignedUrl();
  const { mutateAsync: uploadFile } = useUploadFile();
  const { mutateAsync: uploadProfilePicture } = useUpdateUserProfilePicture();
  const [image, setImage] = useState(currentImage ?? "");
  const [loading, setLoading] = useState(false);


  const inputRef = useRef<HTMLInputElement>(null);

  console.log("Current image:", currentImage);

  const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  try {
    setLoading(true);

const data = await generatePresignedUrl({
  subFolder: "profile",
  fileName: `profile_photo_${file.name}`,
  contentType: file.type,
});

if (!data?.data?.key || !data?.data?.url) {
  throw new Error("Failed to generate pre-signed URL");
}

console.log("Presigned URL data:", data.data);

await uploadFile({
  uploadUrl: data.data.url,
  file,
  contentType: file.type,
});

setImage(URL.createObjectURL(file));

const updatedUser = await uploadProfilePicture({
  s3Url: data.data.key,
});



  } catch (error) {
    console.error(error);
    alert("Upload failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <Stack spacing={2} alignItems="center">

      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileUpload}
      />

      <div
        className="
        w-44
        h-44
        rounded-2xl
        border-2
        border-dashed
        border-blue-300
        overflow-hidden
        flex
        justify-center
        items-center
      "
      >
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <PhotoCameraOutlinedIcon
            sx={{ fontSize: 50 }}
            color="primary"
          />
        )}
      </div>

      <Button
        variant="contained"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
      >
        {loading ? (
          <>
            <CircularProgress
              color="inherit"
              size={20}
              sx={{ mr: 1 }}
            />
            Uploading...
          </>
        ) : (
          "Upload Photo"
        )}
      </Button>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        JPG, PNG, WEBP (Max 2 MB)
      </Typography>

    </Stack>
  );
}