// src/pages/students/StudentProfile.tsx
import { Autocomplete, Box, Button, Card, CardContent, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import * as Yup from "yup"
import ProfilePhotoUpload from '../../Components/ui/ProfilePhotoUpload';
import ProfileSectionCard from '../../Components/ui/ProfileSectionCard';
import { PersonOutlineOutlined } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import { Role, useAuthStore } from '../../store/auth.store';
import { Navigate } from 'react-router-dom';
import type { Address } from '../../store/coaching.store';
import type { CompleteStudentProfile } from '../../services/StudentService';

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
    .trim()
    .required("Student name is required")
    .max(50, "Maximum 50 characters allowed"),

  parentName: Yup.string()
    .trim()
    .required("Parent name is required")
    .max(50, "Maximum 50 characters allowed"),

  contactNumber: Yup.string()
    .required("Student mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  parentPhone: Yup.string()
    .required("Parent mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .notOneOf(
      [Yup.ref("contactNumber")],
      "Student and parent mobile numbers cannot be the same"
    ),

  email: Yup.string()
    .trim()
    .email("Enter a valid email"),

  parentEmail: Yup.string()
    .trim()
    .email("Enter a valid email"),
    
  gender : Yup.string().required("Gender is required"),

  address: addressSchema,
});


const StudentProfile = () => {
    


     const user = useAuthStore(state => state.user)
     console.log("inside student profile ",user)
    
        const role: Role | undefined = user?.role;

        if(role !== Role.STUDENT){
           return   <Navigate to ={"/home"} replace />
        }

        const initialValues: CompleteStudentProfile = {
          name: user?.name ?? "",
          email: user?.email ?? "",
          contactNumber: user?.contactNumber ?? "",
          gender : user?.gender ?? null ,
          motherName : user?.motherName ??"",
          fatherName : user?.fatherName ?? "",
          dob: user?.dob ?? "",
        
          parentName: user?.parentName ?? "",
          parentPhone: user?.parentPhone ?? "",
          
          parentEmail: user?.parentEmail ?? "",
          address: {
            country: user?.address?.country ?? "",
            state: user?.address?.state ?? "",
            city: user?.address?.city ?? "",
            area: user?.address?.area ?? "",
            pinCode: user?.address?.pinCode ?? "",
            postOffice: user?.address?.postOffice ?? "",
            building: user?.address?.building ?? "",
            houseNo: user?.address?.houseNo ?? "",
          }
        };


        return (
  <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={(values) => {
      console.log(values);
      completeProfile(values);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
    }) => (
      <Form>
        <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
          <Typography variant="h4" sx={{fontWeight:700}}>
            Complete Your Profile
          </Typography>

          <Typography color="text.secondary" sx={{mb:4}}>
            Please complete your information before accessing the dashboard.
          </Typography>

          

          {/* Basic Details */}

         <ProfileSectionCard
  icon={<PersonOutlineOutlined color="primary" />}
  title="Basic Details"
  subtitle="Let's start with some basic information about you."
  photoSection={<ProfilePhotoUpload />}
>
  <Grid container spacing={2}>
    {/* Row 1 */}

    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        disabled
        label="Student Name"
        name="name"
        value={user?.name ?? ""}
      />
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        disabled
        label="Student Email"
        name="email"
        value={user?.email ?? ""}
      />
    </Grid>

    {/* Row 2 */}

    <Grid size={{ xs: 12, md: 64}}>
      <TextField
        fullWidth
        label="Contact Number"
        name="contactNumber"
        value={values.contactNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.contactNumber &&
          Boolean(errors.contactNumber)
        }
        helperText={
          touched.contactNumber &&
          errors.contactNumber
        }
      />
    </Grid>

    <Grid size={{ xs: 12, md: 64}}>
      <TextField
        fullWidth
        type="date"
        label="Date of Birth"
        name="dob"
        value={values.dob}
        onChange={handleChange}
        onBlur={handleBlur}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        error={touched.dob && Boolean(errors.dob)}
        helperText={touched.dob && errors.dob}
      />
    </Grid>

    <Grid size={{ xs: 12, md: 64}}>
  {/* <Autocomplete
    options={genderOptions}
    value={
      genderOptions.find(
        (option) => option.value === values.gender
      ) ?? null
    }
    onChange={(_, value) =>
      setFieldValue("gender", value?.value ?? "")
    }
    isOptionEqualToValue={(option, value) =>
      option.value === value.value
    }
    getOptionLabel={(option) => option.label}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Gender"
        onBlur={handleBlur}
        error={touched.gender && Boolean(errors.gender)}
        helperText={touched.gender && errors.gender}
      />
    )}
  /> */}
</Grid>
  </Grid>
</ProfileSectionCard>
          {/* Guardian */}

  <Card sx={{ mt: 4, mb: 4 }}>
  <CardContent>
    <Typography variant="h6">
      Parent / Guardian
    </Typography>

    <Divider sx={{ my: 2 }} />

    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Father Name"
          name="fatherName"
          value={values.fatherName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.fatherName && errors.fatherName)}
          helperText={touched.fatherName && errors.fatherName}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Mother Name"
          name="motherName"
          value={values.motherName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.motherName && errors.motherName)}
          helperText={touched.motherName && errors.motherName}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Parent Name"
          name="parentName"
          value={values.parentName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.parentName && errors.parentName)}
          helperText={touched.parentName && errors.parentName}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Parent Mobile Number"
          name="parentPhone"
          value={values.parentPhone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.parentPhone && errors.parentPhone)}
          helperText={touched.parentPhone && errors.parentPhone}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Parent Email"
          name="parentEmail"
          value={values.parentEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.parentEmail && errors.parentEmail)}
          helperText={touched.parentEmail && errors.parentEmail}
        />
      </Grid>
    </Grid>
  </CardContent>
</Card>

          {/* Address */}

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6">
                Address
              </Typography>

              <Divider sx={{ my: 2 }} />

             <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
    },
    gap: 2,
  }}
>
  {addressFields.map((field) => (
    <TextField
      key={field.name}
      fullWidth
      label={field.label}
      name={`address.${field.name}`}
      value={values.address[field.name]}
      onChange={handleChange}
      onBlur={handleBlur}
      error={
        touched.address?.[field.name] &&
        Boolean(errors.address?.[field.name])
      }
      helperText={
        touched.address?.[field.name] &&
        errors.address?.[field.name]
      }
    />
  ))}
</Box>
            </CardContent>
          </Card>

          {/* TODO:
              Academic Card
              Emergency Card
              Same pattern using values, handleChange, errors and touched
          */}

          <Box
  sx={{
    display: "flex",
    justifyContent: {
      xs: "center",
      md: "flex-end",
    },
    mt: 3,
  }}
>
  <Stack direction="row" spacing={2}>
    <Button variant="outlined">
      Cancel
    </Button>

    <Button variant="contained" type="submit">
      Save & Continue
    </Button>
  </Stack>
</Box>
        </Box>
      </Form>
    )}
  </Formik>
);
  
}

export default StudentProfile