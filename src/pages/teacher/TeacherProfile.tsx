// src/pages/teacher/TeacherProfile.tsx

import * as Yup from "yup";
import { Formik, Form } from "formik";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  PersonOutlineOutlined,
} from "@mui/icons-material";

import { CalendarIcon } from "lucide-react";

import {
  Navigate,
} from "react-router-dom";

import type { Address } from "../../store/coaching.store";
import type { CompleteTeacherProfile } from "../../services/TeacherService";

import {
  Role,
  useAuthStore,
} from "../../store/auth.store";

import {
  useCompleteTeacherProfile,
} from "../../hooks/teacher.hooks";

import ProfileSectionCard from "../../Components/ui/ProfileSectionCard";
import ProfilePhotoUpload from "../../Components/ui/ProfilePhotoUpload";
import { useState } from "react";
import { useGetUser } from "../../hooks/auth.hooks";


const schema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(
      50,
      "Maximum 50 characters"
    ),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  contactNumber: Yup.string()
    .required(
      "Contact number is required"
    ),

  gender: Yup.string()
    .required(
      "Gender is required"
    ),

  dob: Yup.string()
    .required(
      "Date of birth is required"
    ),

  experience: Yup.number()
    .typeError(
      "Experience must be a number"
    )
    .min(
      0,
      "Experience cannot be negative"
    )
    .required(
      "Experience is required"
    ),

  subjects: Yup.array()
    .of(
      Yup.string()
        .trim()
        .required(
          "Subject cannot be empty"
        )
    )
    .min(
      1,
      "Select at least one subject"
    )
    .required(
      "Subjects are required"
    ),

  degrees: Yup.array()
    .of(
      Yup.string()
        .trim()
        .required(
          "Degree cannot be empty"
        )
    )
    .min(
      1,
      "Select at least one degree"
    )
    .required(
      "Degrees are required"
    ),

  address: Yup.object({
    country: Yup.string()
      .required(
        "Country is required"
      ),

    state: Yup.string()
      .required(
        "State is required"
      ),

    city: Yup.string()
      .required(
        "City is required"
      ),

    area: Yup.string()
      .required(
        "Area is required"
      ),

    pinCode: Yup.string()
      .required(
        "Pincode is required"
      )
      .matches(
        /^\d{6}$/,
        "Pincode must be 6 digits"
      ),

    postOffice: Yup.string()
      .required(
        "Post office is required"
      ),

    building: Yup.string()
      .nullable(),

    houseNo: Yup.string()
      .required(
        "House number is required"
      ),
  }),
});



const addressFields: Array<{
  name: keyof Address;
  label: string;
}> = [
  {
    name: "country",
    label: "Country",
  },
  {
    name: "state",
    label: "State",
  },
  {
    name: "city",
    label: "City",
  },
  {
    name: "area",
    label: "Area",
  },
  {
    name: "pinCode",
    label: "Pin Code",
  },
  {
    name: "postOffice",
    label: "Post Office",
  },
  {
    name: "building",
    label: "Building",
  },
  {
    name: "houseNo",
    label: "House No.",
  },
];



const TeacherProfile = () => {
  const user = useAuthStore( (state) => state.user);

  const {data : teacher} = useGetUser();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    mutate: completeProfile,
    isPending,
    isSuccess,
  } = useCompleteTeacherProfile();


  if (user?.role !== Role.TEACHER) {
    return (
      <Navigate
        to="/completeProfile"
        replace
      />
    );
  }



  const initialValues: CompleteTeacherProfile =
    {
      name: user.name ?? "",

      email: user.email ?? "",

      contactNumber: user.contactNumber ?? "",

      gender: user.gender ?? null,

      dob: user.dob ?? "",

      degrees: teacher?.degress ?? [],

      subjects: teacher?.subjects ?? [],

      experience: teacher?.experience ?? 0,

      address: {
        country:
          user.address?.country ?? "",

        state:
          user.address?.state ?? "",

        city:
          user.address?.city ?? "",

        area:
          user.address?.area ?? "",

        pinCode:
          user.address?.pinCode ?? "",

        postOffice:
          user.address?.postOffice ?? "",

        building:
          user.address?.building ?? "",

        houseNo:
          user.address?.houseNo ?? "",
      },
    };


  if (isSuccess) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize={false}
      onSubmit={(values) => {
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
        resetForm,
      }) => {

        

        return (
          <Form>
            <Box
              sx={{
                width: "100%",
                maxWidth: 1200,
                mx: "auto",
                p: {
                  xs: 2,
                  md: 4,
                },
              }}
            >
              

              <Box
                sx={{
                  mb: 4,

                  display: "flex",

                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },

                  alignItems: {
                    xs: "stretch",
                    sm: "center",
                  },

                  justifyContent:
                    "space-between",

                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                  >
                    Teacher Profile
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.75,
                    }}
                  >
                    View and manage your
                    profile information.
                  </Typography>
                </Box>

                {/* EDIT BUTTON */}

                {!isEditing && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      setIsEditing(true)
                    }
                    sx={{
                      alignSelf: {
                        xs: "flex-start",
                        sm: "auto",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>

              

              <ProfileSectionCard
                icon={
                  <PersonOutlineOutlined
                    color="primary"
                  />
                }
                title="Basic Details"
                subtitle="Your basic personal information."
                photoSection={
                  <ProfilePhotoUpload
                    currentImage={
                      user.profile_picture ??
                      ""
                    }
                    subFolder="profile"
                    fileName="profile_photo"
                    entityId={
                      user.id ?? ""
                    }
                    onUploaded={(url) =>
                      console.log(
                        "Profile photo uploaded:",
                        url
                      )
                    }
                  />
                }
              >
                <Grid
                  container
                  spacing={2}
                >
                  {/* NAME */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      disabled
                      label="Teacher Name"
                      name="name"
                      value={
                        values.name
                      }
                    />
                  </Grid>

                  {/* EMAIL */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <TextField
                      fullWidth
                      disabled
                      label="Teacher Email"
                      name="email"
                      value={
                        values.email
                      }
                    />
                  </Grid>

                  {/* CONTACT */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <TextField
                      fullWidth
                      disabled={
                        !isEditing
                      }
                      label="Contact Number"
                      name="contactNumber"
                      value={
                        values.contactNumber
                      }
                      onChange={
                        handleChange
                      }
                      onBlur={
                        handleBlur
                      }
                      error={
                        touched.contactNumber &&
                        Boolean(
                          errors.contactNumber
                        )
                      }
                      helperText={
                        touched.contactNumber &&
                        errors.contactNumber
                      }
                    />
                  </Grid>

                  {/* DOB */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <TextField
                      fullWidth
                      disabled={
                        !isEditing
                      }
                      type="date"
                      label="Date of Birth"
                      name="dob"
                      value={
                        values.dob
                      }
                      onChange={
                        handleChange
                      }
                      onBlur={
                        handleBlur
                      }
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },

                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarIcon
                                size={18}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                      error={
                        touched.dob &&
                        Boolean(
                          errors.dob
                        )
                      }
                      helperText={
                        touched.dob &&
                        errors.dob
                      }
                    />
                  </Grid>

                  {/* GENDER */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <TextField
                      fullWidth
                      disabled
                      label="Gender"
                      name="gender"
                      value={
                        values.gender ??
                        ""
                      }
                      error={
                        touched.gender &&
                        Boolean(
                          errors.gender
                        )
                      }
                      helperText={
                        touched.gender &&
                        errors.gender
                      }
                    />
                  </Grid>
                </Grid>
              </ProfileSectionCard>

              

              <Card
                sx={{
                  mt: 4,
                  mb: 4,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                  >
                    Professional Details
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    Your teaching experience,
                    subjects, and educational
                    qualifications.
                  </Typography>

                  <Divider
                    sx={{
                      my: 2,
                    }}
                  />

                  <Grid
                    container
                    spacing={2}
                  >
                   

                    <Grid
                      size={{
                        xs: 12,
                        md: 6,
                      }}
                    >
                      <Autocomplete
                        multiple
                        freeSolo
                        fullWidth
                        disabled={
                          !isEditing
                        }
                        options={[]}
                        value={
                          values.subjects
                        }
                        onChange={(
                          _event,
                          value
                        ) => {
                          setFieldValue(
                            "subjects",
                            value
                          );
                        }}
                        renderInput={(
                          params
                        ) => (
                          <TextField
                            {...params}
                            label="Subjects"
                            placeholder={
                              isEditing
                                ? "Type subject and press Enter"
                                : ""
                            }
                            error={
                              touched.subjects &&
                              Boolean(
                                errors.subjects
                              )
                            }
                            helperText={
                              touched.subjects &&
                              typeof errors.subjects ===
                                "string"
                                ? errors.subjects
                                : undefined
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* DEGREES */}

                    <Grid
                      size={{
                        xs: 12,
                        md: 6,
                      }}
                    >
                      <Autocomplete
                        multiple
                        freeSolo
                        fullWidth
                        disabled={
                          !isEditing
                        }
                        options={[]}
                        value={
                          values.degrees
                        }
                        onChange={(
                          _event,
                          value
                        ) => {
                          setFieldValue(
                            "degrees",
                            value
                          );
                        }}
                        renderInput={(
                          params
                        ) => (
                          <TextField
                            {...params}
                            label="Degrees"
                            placeholder={
                              isEditing
                                ? "Type degree and press Enter"
                                : ""
                            }
                            error={
                              touched.degrees &&
                              Boolean(
                                errors.degrees
                              )
                            }
                            helperText={
                              touched.degrees &&
                              typeof errors.degrees ===
                                "string"
                                ? errors.degrees
                                : undefined
                            }
                          />
                        )}
                      />
                    </Grid>

                   

                    <Grid
                      size={{
                        xs: 12,
                        md: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        disabled={
                          !isEditing
                        }
                        type="number"
                        label="Experience (Years)"
                        name="experience"
                        value={
                          values.experience
                        }
                        onChange={
                          handleChange
                        }
                        onBlur={
                          handleBlur
                        }
                        slotProps={{
                          htmlInput: {
                            min: 0,
                          },
                        }}
                        error={
                          touched.experience &&
                          Boolean(
                            errors.experience
                          )
                        }
                        helperText={
                          touched.experience &&
                          errors.experience
                        }
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              

              <Card
                sx={{
                  mb: 4,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                  >
                    Address
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    Your current residential
                    address.
                  </Typography>

                  <Divider
                    sx={{
                      my: 2,
                    }}
                  />

                  <Box
                    sx={{
                      display: "grid",

                      gridTemplateColumns:
                        {
                          xs: "1fr",
                          sm: "repeat(2, 1fr)",
                        },

                      gap: 2,
                    }}
                  >
                    {addressFields.map(
                      (field) => {
                        const fieldName =
                          `address.${field.name}`;

                        const fieldError =
                          errors.address?.[
                            field.name
                          ];

                        const fieldTouched =
                          touched.address?.[
                            field.name
                          ];

                        return (
                          <TextField
                            key={
                              field.name
                            }
                            fullWidth
                            disabled={
                              !isEditing
                            }
                            label={
                              field.label
                            }
                            name={
                              fieldName
                            }
                            value={
                              values.address[
                                field.name
                              ] ?? ""
                            }
                            onChange={
                              handleChange
                            }
                            onBlur={
                              handleBlur
                            }
                            error={Boolean(
                              fieldTouched &&
                                fieldError
                            )}
                            helperText={
                              fieldTouched &&
                              typeof fieldError ===
                                "string"
                                ? fieldError
                                : undefined
                            }
                          />
                        );
                      }
                    )}
                  </Box>
                </CardContent>
              </Card>

              
              {isEditing && (
                <Box
                  sx={{
                    display: "flex",

                    justifyContent: {
                      xs: "stretch",
                      sm: "flex-end",
                    },

                    mt: 3,
                    mb: 3,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "auto",
                      },
                    }}
                  >
                    

                    <Button
                      fullWidth={
                        false
                      }
                      variant="outlined"
                      type="button"
                      disabled={
                        isPending
                      }
                      onClick={() => {
                        resetForm();
                        setIsEditing(
                          false
                        );
                      }}
                    >
                      Cancel
                    </Button>

                    {/* SAVE */}

                    <Button
                      variant="contained"
                      type="submit"
                      disabled={
                        isPending
                      }
                    >
                      {isPending
                        ? "Saving..."
                        : "Save Changes"}
                    </Button>
                  </Stack>
                </Box>
              )}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TeacherProfile;