// src/Components/PanelsWithForms/TeacherForm.tsx
// src/Components/PanelsWithForms/TeacherForm.tsx
import { Form, Formik, getIn } from 'formik';
import CustomDrawer from '../ui/CustomDrawer';
import * as Yup from "yup";
import type { Address } from '../../store/coaching.store';
import { Autocomplete, Button, Divider, Grid, Stack, TextField, Typography, Chip, Box } from '@mui/material';
import { useState } from 'react';
import { useAddTeacherByAdmin } from '../../hooks/teacher.hooks';

type FormType = "Add" | "Update";

interface TeacherFormProps {
  type: FormType;
  open: boolean;
  teacherId: string | null;
  closeModal: () => void;
}

export interface TeacherFormValues {
  name: string;
  contactNumber: string;
  email: string;
  address: Address;
  degrees: string[];
  experience: number | '';
  batches: string[];
  subjects: string[];
}

const emptyAddress: Address = {
  country: "", state: "", city: "", area: "", pinCode: "",
  postOffice: "", building: "", houseNo: ""
};

const initialValues: TeacherFormValues = {
  name: "",
  contactNumber: "",
  email: "",
  address: { ...emptyAddress },
  degrees: [],
  experience: '',
  batches: [],
  subjects: [],
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

  experience: Yup.number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience seems too high")
    .required("Experience is required"),

  degrees: Yup.array().of(Yup.string()).min(1, "At least one degree is required"),
  subjects: Yup.array().of(Yup.string()).min(1, "At least one subject is required"),
  batches: Yup.array().of(Yup.string()),

  address: addressSchema,
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

// Sample options - you can move these to constants or fetch from API
const commonSubjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Computer Science"];
const commonBatches = ["Morning", "Evening", "Weekend"];
const commonDegrees = ["B.Ed", "M.Sc", "B.Sc", "MA", "PhD", "B.A", "M.Ed"];

const TeacherForm = ({ open, closeModal, teacherId }: TeacherFormProps) => {
  const [newDegree, setNewDegree] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newBatch, setNewBatch] = useState("");

  // Replace with your actual mutation hook
  // const { mutate: addTeacher, isPending } = useAddTeacher(closeModal);
  const {mutate: addTeacher,isPending} = useAddTeacherByAdmin(closeModal);

  return (
    <CustomDrawer
      open={open}
      onClose={closeModal}
      title={teacherId ? "Update Teacher" : "Add Teacher"}
      size="lg"
      anchor="right"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          
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

                <Grid size={12}>
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
              </Grid>

              <Divider />

              {/* Experience & Degrees */}
              <Grid container spacing={3}>
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

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" gutterBottom>Degrees</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {values.degrees.map((deg, index) => (
                      <Chip
                        key={index}
                        label={deg}
                        onDelete={() => setFieldValue('degrees', values.degrees.filter((_, i) => i !== index))}
                      />
                    ))}
                  </Stack>
                  <div className='flex flex-row gap-1 mt-1'>
                    <TextField
                      size="small"
                      label="Add Degree"
                      value={newDegree}
                      onChange={(e) => setNewDegree(e.target.value)}
                    />
                    <Button
                    disabled = {isPending}
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        if (newDegree.trim()) {
                          setFieldValue('degrees', [...values.degrees, newDegree.trim()]);
                          setNewDegree("");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </Grid>
              </Grid>

              <Divider />

              {/* Subjects & Batches */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" gutterBottom>Subjects</Typography>
                  <Autocomplete
                    multiple
                    options={commonSubjects}
                    value={values.subjects}
                    onChange={(_, newValue) => setFieldValue("subjects", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Subjects"
                        error={Boolean(touched.subjects && errors.subjects)}
                        helperText={touched.subjects && errors.subjects}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" gutterBottom>Batches</Typography>
                  <Autocomplete
                    multiple
                    options={commonBatches}
                    value={values.batches}
                    onChange={(_, newValue) => setFieldValue("batches", newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Batches" />
                    )}
                  />
                </Grid>
              </Grid>

              <Divider />

              {/* Address Section */}
              <Stack spacing={2}>
                <Typography variant="h6">Address</Typography>
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

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 justify-end mt-4">
                <Button  disabled = {isPending} variant="outlined" onClick={closeModal}>
                  Cancel
                </Button>
                <Button  disabled = {isPending} variant="contained" type="submit">
                  {teacherId === null ? "Add Teacher" : "Update Teacher"}
                </Button>
              </div>
            </Stack>
          </Form>
        )}
      </Formik>
    </CustomDrawer>
  );
};

export default TeacherForm;