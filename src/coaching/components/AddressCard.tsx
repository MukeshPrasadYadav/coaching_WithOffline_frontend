// src/coaching/components/AddressCard.tsx
import {
  Button,
  Card,
  CardContent,
  Divider,
   Grid,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Formik, Form } from "formik";
import * as Yup from "yup";

export interface Address {
  country: string;
  state: string;
  city: string;
  area: string;
  pinCode: string;
  postOffice: string;
  building: string;
  houseNo: string;
}

interface Props {
  address: Address;
  editing: boolean;
  loading?: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (values: Address) => void;
}

const schema = Yup.object({
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

export default function AddressCard({
  address,
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
        mt: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "none",
      }}
    >
      <Formik
        enableReinitialize
        initialValues={address}
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
              {/* Header - Left: Icon + Title | Right: Edit Button */}
              <div
                className="flex flex-row justify-between items-center "
              >
                <div className="flex flex-row gap-x-0.5 items-center">
                  <LocationOnRoundedIcon
                    color="primary"
                    sx={{ fontSize: 32 }}
                  />
                  <div
                  >
                    <Typography variant="h6" >
                      Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location details of your coaching
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

              {/* Balanced Fields */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Country
                  </Typography>
                  {editing ? (
                    <TextField variant="standard" fullWidth size="small" name="country" value={values.country} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.country && errors.country)} helperText={touched.country && errors.country} />
                  ) : (
                    <Typography variant="body1" >{address?.country || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    State
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  fullWidth size="small" name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.state && errors.state)} helperText={touched.state && errors.state} />
                  ) : (
                    <Typography variant="body1" >{address?.state || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    City
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  fullWidth size="small" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.city && errors.city)} helperText={touched.city && errors.city} />
                  ) : (
                    <Typography variant="body1" >{address?.city || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Area
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  fullWidth size="small" name="area" value={values.area} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.area && errors.area)} helperText={touched.area && errors.area} />
                  ) : (
                    <Typography variant="body1" >{address?.area || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Pin Code
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  fullWidth size="small" name="pinCode" value={values.pinCode} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.pinCode && errors.pinCode)} helperText={touched.pinCode && errors.pinCode} />
                  ) : (
                    <Typography variant="body1" >{address?.pinCode || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Post Office
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  fullWidth size="small" name="postOffice" value={values.postOffice} onChange={handleChange} onBlur={handleBlur} />
                  ) : (
                    <Typography variant="body1" >{address?.postOffice || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    Building
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  fullWidth size="small" name="building" value={values.building} onChange={handleChange} onBlur={handleBlur} />
                  ) : (
                    <Typography variant="body1" >{address?.building || "—"}</Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 0.5 }}>
                    House No.
                  </Typography>
                  {editing ? (
                    <TextField variant="standard"  fullWidth size="small" name="houseNo" value={values.houseNo} onChange={handleChange} onBlur={handleBlur} />
                  ) : (
                    <Typography variant="body1" >{address?.houseNo || "—"}</Typography>
                  )}
                </Grid>
              </Grid>

              {/* Save Buttons */}
              {editing && (
                <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 4 }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<CloseRoundedIcon />}
                    onClick={() => { onCancel(); resetForm(); }}
                    sx={{ borderRadius: 3, textTransform: "none", px: 3 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveRoundedIcon />}
                    disabled={loading}
                    sx={{ borderRadius: 3, textTransform: "none", px: 4 }}
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