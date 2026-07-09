// src/coaching/components/CoachingInformationCard.tsx
import {
  Button,
  Card,
  CardContent,
  Divider,
   Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export interface CoachingInformation {
  name: string;
  ownerName: string;
  ownerEmail: string;
  ownerContactNumber: string;
}

interface Props {
  coaching: CoachingInformation;
  editing: boolean;
  loading?: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (values: CoachingInformation) => void;
}

const schema = Yup.object({
  name: Yup.string().required("Coaching name is required"),
  ownerName: Yup.string().required("Owner name is required"),
  ownerEmail: Yup.string().email("Invalid email address").required("Email is required"),
  ownerContactNumber: Yup.string().required("Contact number is required"),
});

export default function CoachingInformationCard({
  coaching,
  editing,
  loading,
  onEdit,
  onCancel,
  onSubmit,
}: Props) {
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
        initialValues={coaching}
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
                    Coaching Name
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
                      {coaching.name || "—"}
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
                    Owner Name
                  </Typography>
                  {editing ? (
                    <TextField
                    variant="standard"
                      fullWidth
                      size="small"
                      name="ownerName"
                      value={values.ownerName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.ownerName && errors.ownerName)}
                      helperText={touched.ownerName && errors.ownerName}
                    />
                  ) : (
                    <Typography variant="body1" >
                      {coaching.ownerName || "—"}
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
                    Owner Email
                  </Typography>
                  {editing ? (
                    <TextField
                    variant="standard"
                      fullWidth
                      size="small"
                      name="ownerEmail"
                      value={values.ownerEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.ownerEmail && errors.ownerEmail)}
                      helperText={touched.ownerEmail && errors.ownerEmail}
                    />
                  ) : (
                    <Typography variant="body1" >
                      {coaching.ownerEmail || "—"}
                    </Typography>
                  )}
                </Grid>

                {/* Contact Number */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ mb: 0.5 }}
                  >
                    Contact Number
                  </Typography>
                  {editing ? (
                    <TextField
                    variant="standard"
                      fullWidth
                      size="small"
                      name="ownerContactNumber"
                      value={values.ownerContactNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.ownerContactNumber &&
                          errors.ownerContactNumber
                      )}
                      helperText={
                        touched.ownerContactNumber &&
                        errors.ownerContactNumber
                      }
                    />
                  ) : (
                    <Typography variant="body1" >
                      {coaching.ownerContactNumber || "—"}
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