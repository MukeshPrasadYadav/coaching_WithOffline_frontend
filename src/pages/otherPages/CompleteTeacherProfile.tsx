// src/pages/otherPages/CompleteTeacherProfile.tsx
// src/coaching/pages/CompleteTeacherProfile.tsx
import { CloseRounded, PersonOutlineOutlined, SaveRounded, SchoolRounded } from '@mui/icons-material'
import { Autocomplete, Box, Button, Card, CardContent, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { Role, useAuthStore } from '../../store/auth.store'
import { Navigate } from 'react-router-dom'
import ProfilePhotoUpload from '../../Components/ui/ProfilePhotoUpload'
import ProfileSectionCard from '../../Components/ui/ProfileSectionCard'
import type { CompleteTeacherProfile } from '../../services/TeacherService'
import type { Address } from '../../store/coaching.store'
import { useCompleteTeacherProfile } from '../../hooks/teacher.hooks'


 const schema = Yup.object({
  name: Yup.string()
    .required("Coaching name is required")
    .max(50, "Maximum 50 characters"),


  email: Yup.string()
    .email("Invalid email")
    .required("Owner email is required"),

    contactNumber: Yup.string()
    .required("Contact number is required"),

    gender : Yup.string().required("Gender is required"),
    
    dob: Yup.string().required("DOB is required"),
    
    experience : Yup.number().required("Experience is required"), 

    fee : Yup.number().required("Enter your fee"),

    subjects: Yup.array()
  .of(
    Yup.string()
      .trim()
      .required("Subject cannot be empty")
  )
  .min(1, "Select at least one subject")
  .required("Subjects are required"),

degrees  : Yup.array()
  .of(
    Yup.string()
      .trim()
      .required("Degrees cannot be empty")
  )
  .min(1, "Select at least one degree")
  .required("Degrees are required"),

  

  address: Yup.object({
    country: Yup.string()
      .required("Country is required"),

    state: Yup.string()
      .required("State is required"),

    city: Yup.string()
      .required("City is required"),

    area: Yup.string()
      .required("Area is required"),

    pinCode: Yup.string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be 6 digits"),

    postOffice: Yup.string()
      .required("Post office is required"),

    building: Yup.string()
      .nullable(),

    houseNo: Yup.string()
      .required("House number is required"),
  }),
});

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];

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




const CompleteTeacherProfile = () => {
  const user = useAuthStore((state) => state.user);
  console.log("usr",user)

  const {mutate : completeProfile, isPending,isSuccess} = useCompleteTeacherProfile();
    
      if(user?.isProfileCompleted || user?.role !== Role.TEACHER){
        return <Navigate to ="/completeProfile" replace />
      }
      if(isSuccess || user?.isProfileCompleted){
        return <Navigate to="/home" replace />
      }

      const initialValues: CompleteTeacherProfile = {
        name: user?.name ?? "",
        email: user?.email ?? "",
        contactNumber: user?.contactNumber ?? "",
        gender : user?.gender ?? null ,
        dob: "",
        degrees : [],
        subjects : [],
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
          <Typography variant="h4" fontWeight={700}>
            Complete Your Profile
          </Typography>

          <Typography color="text.secondary" mb={4}>
            Please complete your information before accessing the dashboard.
          </Typography>

          

          {/* Basic Details */}

         <ProfileSectionCard
  icon={<PersonOutlineOutlined color="primary" />}
  title="Basic Details"
  subtitle="Let's start with some basic information about you."
  photoSection={<ProfilePhotoUpload 
  currentImage={user?.profile_picture ?? ""}
  subFolder ="profile"
  fileName = "profile_photo"
  entityId={user?.id ?? ""}
  onUploaded = {(url) => console.log("Profile photo uploaded to:", url)}/>}
>
  <Grid container spacing={2}>
    {/* Row 1 */}

    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        disabled
        label="Student Name"
        name="name"
        value={user?.name ?? ""}
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        disabled
        label="Student Email"
        name="email"
        value={user?.email ?? ""}
      />
    </Grid>

    {/* Row 2 */}

    <Grid item xs={12} md={4}>
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

    <Grid item xs={12} md={4}>
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

    <Grid item xs={12} md={4}>
  <Autocomplete
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
  />
</Grid>
  </Grid>
</ProfileSectionCard>
          {/* Guardian */}

  <Card sx={{ mt: 4, mb: 4 }}>
  <CardContent>
    <Typography variant="h6">
      Professional Details
    </Typography>

    <Divider sx={{ my: 2 }} />

    <Grid container spacing={2}>
      {/* Subjects */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Autocomplete
          multiple
          freeSolo
          fullWidth
          options={[]}
          value={values.subjects}
          onChange={(_, value) => setFieldValue("subjects", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Subjects"
              placeholder="Type a subject and press Enter"
              error={touched.subjects && Boolean(errors.subjects)}
              helperText={touched.subjects && (errors.subjects as string)}
            />
          )}
        />
      </Grid>

      {/* Degrees */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Autocomplete
          multiple
          freeSolo
          fullWidth
          options={[]}
          value={values.degrees}
          onChange={(_, value) => setFieldValue("degrees", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Degrees"
              placeholder="Type a degree and press Enter"
              error={touched.degrees && Boolean(errors.degrees)}
              helperText={touched.degrees && (errors.degrees as string)}
            />
          )}
        />
      </Grid>

      {/* Experience */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="Experience (Years)"
          name="experience"
          value={values.experience}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.experience && Boolean(errors.experience)}
          helperText={touched.experience && errors.experience}
        />
      </Grid>

      {/* Fee */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="number"
          label="Fee"
          name="fee"
          value={values.fee}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fee && Boolean(errors.fee)}
          helperText={touched.fee && errors.fee}
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
  )
}

export default CompleteTeacherProfile