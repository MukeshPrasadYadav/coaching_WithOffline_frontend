// src/Components/PanelsWithForms/StudentForm.tsx
import { Form, Formik } from 'formik';
import CustomDrawer from '../ui/CustomDrawer'
import * as Yup from "yup";
import { useCoachingStore,  type Coaching } from '../../store/coaching.store';
import { Autocomplete, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useAddStudent } from '../../hooks/student.hook';
import {  useGetBatchForEnroll } from '../../hooks/batch.hooks';

type FormType ="Add" | "Update"

interface StudentFormProps{
  type : FormType;
  open : boolean;
  studentId : string| null;
  closeModal : () => void;

}



export interface StudentFormValues {
  name: string;
  email: string;
  contactNumber: string;
  
  batch: string;
}



const initialValues: StudentFormValues = {
  name: "",
  contactNumber: "",
  email: "",
  batch: "",
};







const schema = Yup.object({

  name: Yup.string()
    .required("Student name is required")
    .max(50),

  contactNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number"),

  email: Yup.string()
    .email("Invalid email"),

  batch: Yup.string()
    .required("Please select batch"),

    

});





const StudentForm = ({open, closeModal, studentId} : StudentFormProps) => {
  console.log("student",studentId)
  const {mutate : addStudent, isPending } = useAddStudent(closeModal);
  const coaching: Coaching = useCoachingStore((state) => state.coaching);
  
    const {data: batches } = useGetBatchForEnroll({enabled : open});
    console.log("batches",batches)


  return (
    <CustomDrawer
    open ={open}
    onClose={closeModal}
    title = "Add Student"
    size='lg'
    anchor='right'
    >
      <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => addStudent(values)
       }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) =>(        
          <Form>
          <Stack spacing={4}>
  <Typography variant="h6">
    Student Details
  </Typography>

  <Grid container spacing={3}>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        fullWidth
        variant="standard"
        label="Student Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(touched.name && errors.name)}
        helperText={touched.name && errors.name}
      />
    </Grid>

    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        fullWidth
        variant="standard"
        label="Mobile Number"
        name="contactNumber"
        value={values.contactNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(touched.contactNumber && errors.contactNumber)}
        helperText={touched.contactNumber && errors.contactNumber}
      />
    </Grid>

    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        fullWidth
        variant="standard"
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
      />
    </Grid>

    

    <Grid size={{ xs: 12, sm: 6 }}>
      <Autocomplete
        options={batches ?? []}
        getOptionLabel={(option) => option.name}
        value={
          batches?.find(
            (batch) => batch.id === values.batch
          ) ?? null
        }
        onChange={(_, value) =>
          setFieldValue("batch", value?.id ?? "")
        }
        isOptionEqualToValue={(option, value) =>
          option.id === value.id
        }
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="standard"
            label="Batch"
            error={Boolean(touched.batch && errors.batch)}
            helperText={touched.batch && errors.batch}
          />
        )}
      />
    </Grid>
  </Grid>

  <Divider />

  <Stack
  direction="row"
  spacing={2}
  flexWrap="wrap"
  sx={{
    justifyContent: {
      xs: "center",
      sm: "flex-end",
    },
  }}
>
  <Button
    disabled={isPending}
    variant="outlined"
    onClick={closeModal}
  >
    Cancel
  </Button>

  <Button
    disabled={isPending}
    variant="contained"
    type="submit"
  >
    {studentId === null ? "Add Student" : "Update Student"}
  </Button>
</Stack>
</Stack>
        </Form>
        )
        }


      </Formik>

    </CustomDrawer>
    )
}

export default StudentForm
