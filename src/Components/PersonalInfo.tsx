// src/Components/PersonalInfo.tsx
import { Button, Card, CardContent, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import type { User } from '../store/auth.store';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

interface Props {
  user:User
  editing: boolean;
  loading?: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (values: User) => void;
}

const schema = Yup.object({
  name : Yup.string().required("Name is required"),
  email: Yup.string().required("email is required"),
  contactNumber : Yup.string().required("contact number is required"),


});

const PersonalInfo = ({user,editing,loading,onEdit,onCancel,onSubmit} :Props) => {
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
        initialValues={user}
        validationSchema={schema}
        onSubmit={onSubmit}
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
                  <SchoolRoundedIcon
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
                    startIcon={<EditRoundedIcon />}
                    variant="outlined"
                    onClick={onEdit}
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
                    startIcon={<CloseRoundedIcon />}
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
                    startIcon={<SaveRoundedIcon />}
                    disabled={loading}
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

export default PersonalInfo