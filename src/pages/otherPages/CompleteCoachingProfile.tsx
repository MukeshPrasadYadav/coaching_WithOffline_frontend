// src/pages/otherPages/CompleteCoachingProfile.tsx
import { Button, Card, CardContent, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { Role, useAuthStore } from '../../store/auth.store';
import { CloseRounded, SaveRounded, SchoolRounded } from '@mui/icons-material';
import { useAddCoaching } from '../../hooks/coaching.hooks';
import { Navigate } from 'react-router-dom';

export interface CoachingFormValues {
  name: string;
  ownerName: string;
  ownerEmail: string;
  ownerContactNumber: string;

  address: {
    country: string;
    state: string;
    city: string;
    area: string;
    pinCode: string;
    postOffice: string;
    building: string;
    houseNo: string;
  };
}



 const schema = Yup.object({
  name: Yup.string()
    .required("Coaching name is required")
    .max(50, "Maximum 50 characters"),

  ownerName: Yup.string()
    .required("Owner name is required")
    .max(20, "Maximum 20 characters"),

  ownerEmail: Yup.string()
    .email("Invalid email")
    .required("Owner email is required"),

  ownerContactNumber: Yup.string()
    .required("Contact number is required"),

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

const CompleteCoachingProfile = () => {
    const user = useAuthStore((state) => state.user);
      const {mutate:addCoaching,isPending , isSuccess} = useAddCoaching();
    
      if(user?.isProfileCompleted || user?.role !== Role.ADMIN){
        return <Navigate to ="/completeProfile" replace />
      }
      if(isSuccess){
        return <Navigate to="/home" replace />
      }
  
  return (
    <div className='flex items-center justify-center'>
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <Formik
        enableReinitialize
        initialValues={
          {
              name:   "",
  ownerName: user?.name ?? "",
  ownerEmail: user?.email ?? "",
  ownerContactNumber: user?.contactNumber ?? "",

  address: {
    country: "",
    state: "",
    city: "",
    area: "",
    pinCode: "",
    postOffice: "",
    building: "",
    houseNo: "",
  }

          }
        }
        validationSchema={schema}
        onSubmit={(values) =>{
          addCoaching(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          resetForm,
        }) => (
          <Form>
            <CardContent sx={{ p: 3 }}>
              {/* Header */}
              <div
                 className="flex flex-row justify-between items-center ">
                <div className="flex flex-row gap-x-0.5 items-center">
                  <SchoolRounded
                    color="primary"
                    sx={{ fontSize: 32 }}
                  />
                  <div>
                    <Typography
                      variant="h6"
                    >
                      Coaching Information
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Basic details about your coaching
                    </Typography>
                  </div>
                </div>


              </div>

              <Divider sx={{ mb: 3 }} />

              {/* Form Fields */}
              <Grid container spacing={3}>
  {/* Coaching Name */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="Coaching Name"
      name="name"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.name && errors.name)}
      helperText={touched.name && errors.name}
    />
  </Grid>

  {/* Owner Name */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="Owner Name"
      name="ownerName"
      value={values.ownerName}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.ownerName && errors.ownerName)}
      helperText={touched.ownerName && errors.ownerName}
    />
  </Grid>

  {/* Owner Email */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="Owner Email"
      name="ownerEmail"
      value={values.ownerEmail}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.ownerEmail && errors.ownerEmail)}
      helperText={touched.ownerEmail && errors.ownerEmail}
    />
  </Grid>

  {/* Contact */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="Owner Contact"
      name="ownerContactNumber"
      value={values.ownerContactNumber}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(
        touched.ownerContactNumber && errors.ownerContactNumber
      )}
      helperText={
        touched.ownerContactNumber && errors.ownerContactNumber
      }
    />
  </Grid>

  {/* Country */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="Country"
      name="address.country"
      value={values.address.country}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(
        touched.address?.country && (errors.address as any)?.country
      )}
      helperText={
        touched.address?.country && (errors.address as any)?.country
      }
    />
  </Grid>

  {/* State */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="State"
      name="address.state"
      value={values.address.state}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(
        touched.address?.state && (errors.address as any)?.state
      )}
      helperText={
        touched.address?.state && (errors.address as any)?.state
      }
    />
  </Grid>

  {/* City */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="City"
      name="address.city"
      value={values.address.city}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(
        touched.address?.city && (errors.address as any)?.city
      )}
      helperText={
        touched.address?.city && (errors.address as any)?.city
      }
    />
  </Grid>

  {/* Area */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="Area"
      name="address.area"
      value={values.address.area}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(
        touched.address?.area && (errors.address as any)?.area
      )}
      helperText={
        touched.address?.area && (errors.address as any)?.area
      }
    />
  </Grid>

  {/* Pin Code */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="Pin Code"
      name="address.pinCode"
      value={values.address.pinCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(
        touched.address?.pinCode && (errors.address as any)?.pinCode
      )}
      helperText={
        touched.address?.pinCode && (errors.address as any)?.pinCode
      }
    />
  </Grid>

  {/* Post Office */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="Post Office"
      name="address.postOffice"
      value={values.address.postOffice}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(
        touched.address?.postOffice &&
          (errors.address as any)?.postOffice
      )}
      helperText={
        touched.address?.postOffice &&
        (errors.address as any)?.postOffice
      }
    />
  </Grid>

  {/* Building */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="Building"
      name="address.building"
      value={values.address.building}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </Grid>

  {/* House No */}
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      variant="standard"
      label="House No"
      name="address.houseNo"
      value={values.address.houseNo}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(
        touched.address?.houseNo && (errors.address as any)?.houseNo
      )}
      helperText={
        touched.address?.houseNo && (errors.address as any)?.houseNo
      }
    />
  </Grid>
</Grid>
              {/* Action Buttons - Only shown in edit mode */}
              
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  sx={{ mt: 4 }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<CloseRounded />}
                    disabled={isPending}
                    onClick={() => {
                      onCancel();
                      resetForm();
                    }}
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      px: 3,
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveRounded />}
                    disabled={isPending}
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      px: 4,
                    }}
                  >
                   {isPending ? "Saving" : "Save Changes"} 
                  </Button>
                </Stack>
            
          </CardContent>
            </Form>
        )}
      </Formik>
    </Card>
    </div>
  )
}

export default CompleteCoachingProfile