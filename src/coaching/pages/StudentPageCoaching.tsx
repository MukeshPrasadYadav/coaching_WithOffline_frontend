// src/coaching/pages/StudentPageCoaching.tsx

import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import UserDetailsCard from "../../Components/ui/UserDetailsCard";

const StudentPageCoaching = () => {
  const { studentId } = useParams();
  console.log("Student ID:", studentId);
  return (
    <Box sx={{ p: 4, mx: "auto" }}>
        <UserDetailsCard />
    </Box>
  )
}

export default StudentPageCoaching