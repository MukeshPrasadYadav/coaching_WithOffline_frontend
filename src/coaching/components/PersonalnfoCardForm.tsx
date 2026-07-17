// src/coaching/components/PersonalnfoCardForm.tsx
import { Button, Card, CardContent, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import type { User } from "../../store/auth.store";
import { CloseRounded, EditRounded, SaveRounded, SchoolRounded } from "@mui/icons-material";
import { useState } from "react";
import { useUpdateUser } from "../../hooks/user.hook";

interface PesonalInfoProps{
  user : User
}


const schema = Yup.object({
  name : Yup.string().required("Name is required"),
  email: Yup.string().required("email is required"),
  contactNumber : Yup.string().required("contact number is required"),
  address : Yup.object({
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
})


});
const PersonalInfoCardForm = ({user} :PesonalInfoProps) => {
  console.log("user in personal info",user)
  const [editing,setEditing] = useState<boolean>(false)
  const {mutate : update, isPending,isSuccess,isError} = useUpdateUser(user.id)
  return (
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
        initialValues={{
            name : user?.name ?? "",
            email : user?.email ?? "",
            contactNumber : user?.contactNumber ?? "",
            address :{
                country : user.address?.country ?? "",
                state : user?.address?.state ?? "",
                area : user?.address?.area ?? "",
                pinCode : user?.address?.pinCode ?? "",
                postOffice : user?.address?.postOffice ?? "",
                building : user?.address?.building ?? "",
                houseNo : user?.address?.houseNo ?? "",
                city : user?.address?.city ?? ""
            }
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          update(values);
          if(isSuccess || isError){
            setEditing(false)
          }
        }
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
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
                      Personal Information
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Basic details about you
                    </Typography>
                  </div>
                </div>

                {!editing && (
                  <Button
                    startIcon={<EditRounded />}
                    variant="outlined"
                    onClick={() => setEditing(true)}
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      px: 3,
                      py: 1,
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>

              <Divider sx={{ mb: 3 }} />

              {/* Form Fields */}
              <Grid container spacing={3}>
                {/* Coaching Name */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ mb: 0.5 }}
                  >
                     Name
                  </Typography>
                  {editing ? (
                    <TextField
                    variant="standard"
                      fullWidth
                      size="small"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      sx={{ mt: 0 }}
                    />
                  ) : (
                    <Typography variant="body1" >
                      {user.name || "—"}
                    </Typography>
                  )}
                </Grid>

                {/* Owner Name */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ mb: 0.5 }}
                  >
                    Email
                  </Typography>
                  {editing ? (
                    <TextField
                    variant="standard"
                      fullWidth
                      size="small"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  ) : (
                    <Typography variant="body1" >
                      {user.email || "—"}
                    </Typography>
                  )}
                </Grid>

                {/* Owner Email */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ mb: 0.5 }}
                  >
                    Contact number
                  </Typography>
                  {editing ? (
                    <TextField
                    variant="standard"
                      fullWidth
                      size="small"
                      name="contactNumber"
                      value={values.contactNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.contactNumber && errors.contactNumber)}
                      helperText={touched.contactNumber && errors.contactNumber}
                    />
                  ) : (
                    <Typography variant="body1" >
                      {user.contactNumber || "—"}
                    </Typography>
                  )}
                </Grid>
                
                <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">
            Address
        </Typography>
    </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Country
                  </Typography>
                  {editing ? (
                    <TextField variant="standard" fullWidth size="small"
                    name ="address.country"
                     value={values.address.country}
                      onChange={handleChange} 
                      onBlur={handleBlur} 
                      error={Boolean(touched.address?.country && errors.address?.country)} 
                      helperText={touched.address?.country && errors.address?.country} />
                  ) : (
                    <Typography variant="body1" >{user?.address?.country || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    State
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"
                      fullWidth size="small"
                       name="address.state"
                     value={values.address?.state} 
                     onChange={handleChange} 
                     onBlur={handleBlur} 
                     error={Boolean(touched.address?.state && errors.address?.state)}
                      helperText={touched.address?.state && errors.address?.state} />
                  ) : (
                    <Typography variant="body1" >{user?.address?.state || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    City
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"
                      fullWidth size="small"
                      name="address.city"
                      value={values.address?.city} 
                      onChange={handleChange} 
                      onBlur={handleBlur} 
                      error={Boolean(touched.address?.city && errors.address?.city)} 
                      helperText={touched.address?.city && errors.address?.city} />
                  ) : (
                    <Typography variant="body1" >{user?.address?.city || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Area
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  
                    fullWidth size="small" 
                    name="address.area"
                     value={values.address.area} 
                     onChange={handleChange} 
                     onBlur={handleBlur} 
                     error={Boolean(touched.address?.area && errors.address?.area)} 
                     helperText={touched.address?.area && errors.address?.area} />
                  ) : (
                    <Typography variant="body1" >{user?.address?.area || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Pin Code
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  
                    fullWidth size="small" 
                    name="address.pinCode" 
                    value={values.address?.pinCode} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    error={Boolean(touched.address?.pinCode && errors.address?.pinCode)} 
                    helperText={touched.address?.pinCode && errors.address?.pinCode} />
                  ) : (
                    <Typography variant="body1" >{user.address?.pinCode || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Post 
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  
                    fullWidth size="small" 
                    name="address.postOffice" 
                    value={values.address?.postOffice} 
                    onChange={handleChange} 
                    onBlur={handleBlur} />
                  ) : (
                    <Typography variant="body1" >{user.address?.postOffice || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Building
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  
                    fullWidth size="small" 
                    name="address.building" 
                    value={values.address?.building} 
                    onChange={handleChange} 
                    onBlur={handleBlur} />
                  ) : (
                    <Typography variant="body1" >{user?.address?.building || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    House No.
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  
                    fullWidth size="small" 
                    name="address.houseNo" 
                    value={values.address.houseNo} 
                    onChange={handleChange} 
                    onBlur={handleBlur} />
                  ) : (
                    <Typography variant="body1" >{user?.address?.houseNo || "—"}</Typography>
                  )}
                </Grid>
              </Grid>

               

              {/* Action Buttons - Only shown in edit mode */}
              {editing && (
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
                    onClick={() => {
                      setEditing(false)
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
                    Save Changes
                  </Button>
                </Stack>
              )}
          </CardContent>
            </Form>
        )}
      </Formik>
    </Card>
  );
}

export default PersonalInfoCardForm