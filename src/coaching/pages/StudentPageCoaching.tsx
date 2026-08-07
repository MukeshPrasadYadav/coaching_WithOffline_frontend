  // src/coaching/pages/StudentPageCoaching.tsx

import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import UserDetailsCard from "../../Components/ui/UserDetailsCard";
import { useGetStudentById } from "../../hooks/student.hook";

const StudentPageCoaching = () => {
  const { studentId } = useParams();
  console.log("Student ID:", studentId);
  const {data:student} = useGetStudentById(studentId || "");
  console.log("Student Data:", student);
  return (
    <Box sx={{ p: 4, mx: "auto" }}>
        <UserDetailsCard student={student} />
    </Box>
  )
}

export default StudentPageCoaching