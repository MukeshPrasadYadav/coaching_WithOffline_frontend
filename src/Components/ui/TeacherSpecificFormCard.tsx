// src/Components/ui/TeacherSpecificFormCard.tsx
import { Autocomplete, Card, TextField } from '@mui/material'
import { Grid } from 'lucide-react'
import * as Yup from "yup";
import { Formik, Form } from "formik";
import type { Teacher } from '../../store/teacher.store';

const TeacherSpecificFormCard = (teacher : Teacher) => {
  return (
  //   <Formik
  //           enableReinitialize
  //           initialValues={{

  //           }}
  //           validationSchema={schema}
  //           onSubmit={onSubmit}
  //         >
  //           {({
  //             values,
  //             errors,
  //             touched,
  //             handleChange,
  //             handleBlur,
  //             resetForm,
  //           }) => (
  //             <Form>

  //             </Form>
    
  //           <Card
  //             elevation={0}
  //             sx={{
  //               mt: 3,
  //               borderRadius: 4,
  //               border: "1px solid",
  //               borderColor: "divider",
  //               boxShadow: "none",
  //             }}
  //           >
  //             <Grid size={{xs: 12, md: 6}}>
  //   <Autocomplete
  // multiple
  // freeSolo
  // options={[]} // No predefined options
  // value={values.subjects}
  // onChange={(_, value) => setFieldValue("subjects", value)}
  // renderInput={(params) => (
  //   <TextField
  //     {...params}
//       label="Subjects"
//       placeholder="Type a subject and press Enter"
//     />
//   )}
// />
//   </Grid>

//   <Grid size={{xs: 12, md: 6}}>
//     <Autocomplete
//   multiple
//   freeSolo
//   options={[]} // No predefined options
//   value={values.subjects}
//   onChange={(_, value) => setFieldValue("subjects", value)}
//   renderInput={(params) => (
//     <TextField
//       {...params}
//       label="Subjects"
//       placeholder="Type a subject and press Enter"
//     />
//   )}
// />
//   </Grid>
//           </Card>
<>Hello</>
  )
}

export default TeacherSpecificFormCard