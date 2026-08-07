// src/pages/teacher/AddTeacherForm.tsx
import { Autocomplete, Button, Divider, Grid, Stack, TextField } from '@mui/material';
import { Form, Formik } from 'formik';

import * as Yup from "yup"
import { useAddTeacherByAdmin } from '../../hooks/teacher.hooks';

import { useGetBatchForEnroll } from '../../hooks/batch.hooks';


export interface TeacherRegisterRequest {
  name: string;
  contactNumber: string;
  email: string;
  batches: string[];
  subjects: string[];
 experience: number | '';}



const initialValues: TeacherRegisterRequest = {
  name: "",
  contactNumber: "",
  email: "",
  batches: [],
  subjects: [],
  experience : ""
};



const schema = Yup.object({
  name: Yup.string()
    .required("Teacher name is required")
    .max(50),

  contactNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  subjects: Yup.array().of(Yup.string()),
  batches: Yup.array().of(Yup.string()),
 experience: Yup.number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience seems too high")
    .required("Experience is required"),
});



interface AddTeacherFormProps{
      closeModal: () => void;
      open : boolean

}

const AddTeacherForm = ({closeModal,open} : AddTeacherFormProps) => {
      const {mutate: addTeacher,isPending} = useAddTeacherByAdmin(closeModal);


          const {data: batches } = useGetBatchForEnroll({enabled : open});

          const subjectOptions = [
  ...new Set(
    (batches ?? []).flatMap((batch) => batch.subjects)
  ),
];
      

  return (
    <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log("submit button")
          console.log("values of teacher",values)
           addTeacher(values,{
            onSuccess : () => closeModal()
           });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Stack spacing={4}>
              {/* Basic Info */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Teacher Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
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

                <Grid size={{xs : 12, md : 6}}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                 <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Experience (in years)"
                    name="experience"
                    type="number"
                    value={values.experience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.experience && errors.experience)}
                    helperText={touched.experience && errors.experience}
                  />
                </Grid>
              </Grid>

              <Divider />

              {/* Experience & Degrees */}
              

              {/* Subjects & Batches */}
              <Grid container spacing={3}>
  {/* Subject */}
  <Grid size={{ xs: 12, md: 6 }}>
    <Autocomplete
  multiple
  freeSolo
  options={subjectOptions}
  value={values.subjects}
  onChange={(_, value) => {
    setFieldValue("subjects", value);
  }}
  filterSelectedOptions
  renderInput={(params) => (
    <TextField
      {...params}
      label="Subjects"
      error={Boolean(touched.subjects && errors.subjects)}
      helperText={touched.subjects && (errors.subjects as string)}
    />
  )}
/>
  </Grid>

  {/* Batch */}
  <Grid size={{ xs: 12, md: 6 }}>
    <Autocomplete
      options={batches ?? []}
      getOptionLabel={(option) => option.name}
      value={batches?.find((batch) => batch.id === values.batch) ?? null}
      onChange={(_, value) => {
        setFieldValue("batch", value?.id ?? "");
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Batch"
          error={Boolean(touched.batch && errors.batch)}
          helperText={touched.batch && errors.batch}
        />
      )}
    />
  </Grid>
</Grid>

              <Divider />

              

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 justify-end mt-4">
                <Button  disabled = {isPending} variant="outlined" onClick={closeModal}>
                  Cancel
                </Button>
                <Button 
                onClick={() => console.log("button clicking")}
                 disabled = {isPending} variant="contained" type="submit">
                  {isPending ? "Adding teacher" : "Add teacher"}
                </Button>
              </div>
            </Stack>
          </Form>
        )}
      </Formik>
  )
}

export default AddTeacherForm