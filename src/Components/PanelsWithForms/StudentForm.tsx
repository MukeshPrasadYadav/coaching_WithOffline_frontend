// src/Components/PanelsWithForms/StudentForm.tsx
import { Form, Formik, getIn } from 'formik';
import CustomDrawer from '../ui/CustomDrawer'
import * as Yup from "yup";
import type { Address } from '../../store/coaching.store';
import { Autocomplete, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useAddStudent } from '../../hooks/student.hook';

type FormType ="Add" | "Update"

interface StudentFormProps{
  type : FormType;
  open : boolean;
  studentId : string| null;
  closeModal : () => void;

}

export interface Student {
  name : string;
  id :string;
  email: string;
  contactNumber : string;
  parentNumber : string;
  class_std : string;
  Batch : string;
  parentName : string;
  address : Address;
}

export interface StudentFormValues {
  name: string;
  parentName: string;

  contactNumber: string;
  parentNumber: string;

  email: string;
  parentEmail: string;

  address: Address;

  coachingId: string;
  class_std: string;
  batch: string;
}

const emptyAddress: Address = {
  country: "",
  state: "",
  city: "",
  area: "",
  pinCode: "",
  postOffice: "",
  building: "",
  houseNo: "",
};

const initialValues: StudentFormValues = {
  name: "",
  parentName: "",
  contactNumber: "",
  parentNumber: "",
  email: "",
  parentEmail: "",
  address: { ...emptyAddress },
  coachingId: "",
  class_std: "",
  batch: "",
};

const addressSchema = Yup.object({
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  area: Yup.string().required("Area is required"),
  pinCode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  postOffice: Yup.string(),
  building: Yup.string(),
  houseNo: Yup.string(),
});

const addressFields: Array<{ name: keyof Address; label: string }> = [
  { name: "country", label: "Country" },
  { name: "state", label: "State" },
  { name: "city", label: "City" },
  { name: "area", label: "Area" },
  { name: "pinCode", label: "Pin Code" },
  { name: "postOffice", label: "Post Office" },
  { name: "building", label: "Building" },
  { name: "houseNo", label: "House No." },
];

const schema = Yup.object({

  name: Yup.string()
    .required("Student name is required")
    .max(50),

  parentName: Yup.string()
    .required("Parent name is required")
    .max(50),

  contactNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number"),

  parentNumber: Yup.string()
    .required("Parent mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number"),

  email: Yup.string()
    .email("Invalid email"),

  parentEmail: Yup.string()
    .email("Invalid email"),

address: addressSchema,

  // coachingId: Yup.string()
  //   .required("Please select coaching"),

  class_std: Yup.string()
    .required("Please select class"),

  batch: Yup.string()
    .required("Please select batch")
});

const classes = [
  "Class V",
  "Class VI"
];

const Batches = [
  "Morning",
  "Evening"
]

const StudentForm = ({open, closeModal, studentId} : StudentFormProps) => {
  console.log("student",studentId)
  const {mutate : addStudent, isPending } = useAddStudent(closeModal);

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
          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                  <Typography variant="h6">Student Details</Typography>
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
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                  <Typography variant="h6">Parent Details</Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Parent Name"
                    name="parentName"
                    value={values.parentName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.parentName && errors.parentName)}
                    helperText={touched.parentName && errors.parentName}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Parent Mobile Number"
                    name="parentNumber"
                    value={values.parentNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.parentNumber && errors.parentNumber)}
                    helperText={touched.parentNumber && errors.parentNumber}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Parent Email"
                    name="parentEmail"
                    value={values.parentEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.parentEmail && errors.parentEmail)}
                    helperText={touched.parentEmail && errors.parentEmail}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Divider />

            <Stack spacing={2}>




              <Typography variant="h6">
                Address
              </Typography>
              <Grid container spacing={2}>
                {addressFields.map((field) => {
                  const fieldName = `address.${field.name}`;
                  const fieldError = getIn(errors, fieldName);
                  const fieldTouched = getIn(touched, fieldName);

                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={fieldName}>
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                        {field.label}
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        name={fieldName}
                        value={values.address[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(fieldTouched && fieldError)}
                        helperText={fieldTouched && fieldError}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>

<Grid container spacing={3}>
  {/* Class */}
  <Grid size={{ xs: 12, md: 6 }}>
    <Autocomplete<string, false, false, false>
      options={classes}
      value={values.class_std || null}
      onChange={(_, value) => {
        setFieldValue("class_std", value ?? "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Class"
          variant="standard"
          error={Boolean(touched.class_std && errors.class_std)}
          helperText={touched.class_std && errors.class_std}
        />
      )}
    />
  </Grid>

  {/* Batch */}
  <Grid size={{ xs: 12, md: 6 }}>
    <Autocomplete<string, false, false, false>
      options={Batches}
      value={values.batch || null}
      onChange={(_, value) => {
        setFieldValue("batch", value ?? "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Batch"
          variant="standard"
          error={Boolean(touched.batch && errors.batch)}
          helperText={touched.batch && errors.batch}
        />
      )}
    />
  </Grid>
</Grid>

          </Stack>

          <div
            className='flex flex-wrap gap-2 justify-end mt-2'          >
            <Button disabled ={isPending} variant = "outlined" onClick={closeModal}>
              Cancel
            </Button>

            <Button disabled ={isPending}  variant = 'contained' type="submit">
              { studentId === null ? "Add Student" : "Update Student"}
            </Button>
          </div>
        </Form>
        )
        }


      </Formik>

    </CustomDrawer>
    )
}

export default StudentForm
