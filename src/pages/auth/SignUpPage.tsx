// src/pages/auth/SignUpPage.tsx

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  Box,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Button } from "../../Components/ui";
import { useSignUp } from "../../hooks/auth.hooks";

const SignUpSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  role: Yup.string().required("Please select a role"),
});

const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    mutate: signUp,
    isPending,
  } = useSignUp();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f8fc",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,

          minHeight: {
            xs: "auto",
            md: 650,
          },

          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "0.9fr 1.1fr",
          },

          bgcolor: "background.paper",

          borderRadius: {
            xs: 3,
            md: 5,
          },

          overflow: "hidden",

          border: "1px solid",
          borderColor: "divider",

          boxShadow:
            "0 24px 70px rgba(15, 23, 42, 0.10)",
        }}
      >
        {/* =====================================================
            LEFT BRAND PANEL
        ====================================================== */}

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },

            flexDirection: "column",
            justifyContent: "space-between",

            p: 6,

            color: "white",

            background:
              "linear-gradient(145deg, #17103f 0%, #26145f 48%, #4f35c9 100%)",

            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circle */}

          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,

              borderRadius: "50%",

              bgcolor: "rgba(255,255,255,0.06)",

              top: -100,
              right: -100,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,

              borderRadius: "50%",

              bgcolor: "rgba(255,255,255,0.05)",

              bottom: -80,
              left: -80,
            }}
          />

          {/* Logo */}

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,

                  borderRadius: 2,

                  bgcolor:
                    "rgba(255,255,255,0.14)",

                  border:
                    "1px solid rgba(255,255,255,0.18)",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={21} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                CoachingHub
              </Typography>
            </Stack>
          </Box>

          {/* Main content */}

          <Box
            sx={{
              position: "relative",
              zIndex: 1,

              maxWidth: 430,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  md: "2.5rem",
                  lg: "3rem",
                },

                lineHeight: 1.1,

                fontWeight: 800,

                letterSpacing: "-0.04em",

                mb: 2.5,
              }}
            >
              Start managing your coaching center better.
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.68)",

                lineHeight: 1.7,

                fontSize: "0.98rem",

                maxWidth: 380,
              }}
            >
              Create your account and bring students,
              teachers, batches and daily operations
              together in one place.
            </Typography>

            <Stack
              spacing={2}
              sx={{
                mt: 4,
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <ShieldCheck size={18} />

                <Typography
                  variant="body2"
                  sx={{
                    color:
                      "rgba(255,255,255,0.78)",
                  }}
                >
                  Secure role-based access
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Sparkles size={18} />

                <Typography
                  variant="body2"
                  sx={{
                    color:
                      "rgba(255,255,255,0.78)",
                  }}
                >
                  Simple and organized management
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Footer */}

          <Typography
            variant="caption"
            sx={{
              position: "relative",
              zIndex: 1,

              color:
                "rgba(255,255,255,0.45)",
            }}
          >
            © {new Date().getFullYear()} CoachingHub
          </Typography>
        </Box>

        {/* =====================================================
            SIGNUP PANEL
        ====================================================== */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            px: {
              xs: 3,
              sm: 5,
              md: 7,
            },

            py: {
              xs: 4,
              md: 5,
            },
          }}
        >
          {/* Mobile logo */}

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },

              mb: 5,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,

                borderRadius: 2,

                bgcolor: "primary.main",
                color: "primary.contrastText",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={18} />
            </Box>

            <Typography
              sx={{
                fontWeight: 800,
              }}
            >
              CoachingHub
            </Typography>
          </Stack>

          {/* Heading */}

          <Box
            sx={{
              mb: 3.5,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  md: "2.1rem",
                },

                fontWeight: 800,

                letterSpacing: "-0.035em",

                color: "text.primary",
              }}
            >
              Create your account
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,

                color: "text.secondary",

                lineHeight: 1.6,
              }}
            >
              Join CoachingHub and get started today.
            </Typography>
          </Box>

          {/* Form */}

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              role: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
              signUp(values, {
                onSuccess: () => {
                  navigate("/login");
                },
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
            }) => (
              <Form>
                <Stack spacing={2.2}>
                  {/* Name */}

                  <TextField
                    fullWidth
                    label="Full name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.name &&
                      Boolean(errors.name)
                    }
                    helperText={
                      touched.name && errors.name
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserRound size={18} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                        bgcolor: "#fafafa",
                      },
                    }}
                  />

                  {/* Email */}

                  <TextField
                    fullWidth
                    label="Email address"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.email &&
                      Boolean(errors.email)
                    }
                    helperText={
                      touched.email && errors.email
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={18} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                        bgcolor: "#fafafa",
                      },
                    }}
                  />

                  {/* Password */}

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.password &&
                      Boolean(errors.password)
                    }
                    helperText={
                      touched.password &&
                      errors.password
                    }
                    placeholder="Create a password"
                    autoComplete="new-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockKeyhole size={18} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                        bgcolor: "#fafafa",
                      },
                    }}
                  />

                  {/* Role */}

                  <TextField
                    select
                    fullWidth
                    label="Account type"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.role &&
                      Boolean(errors.role)
                    }
                    helperText={
                      touched.role && errors.role
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                        bgcolor: "#fafafa",
                      },
                    }}
                  >
                    <MenuItem value="TEACHER">
                      Teacher
                    </MenuItem>

                    <MenuItem value="STUDENT">
                      Student
                    </MenuItem>

                    <MenuItem value="PARENT">
                      Parent
                    </MenuItem>

                    <MenuItem value="ADMIN">
                      Coaching Admin
                    </MenuItem>
                  </TextField>

                  {/* Submit */}

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    fullWidth
                    disabled={isPending}
                    sx={{
                      height: 50,

                      mt: 0.5,

                      borderRadius: 2.5,

                      fontSize: "0.95rem",

                      boxShadow:
                        "0 8px 20px rgba(79, 53, 201, 0.20)",
                    }}
                  >
                    {isPending ? (
                      "Creating account..."
                    ) : (
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                      >
                        <span>Create account</span>

                        <ArrowRight size={17} />
                      </Stack>
                    )}
                  </Button>

                  {/* Login */}

                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={0.5}
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Already have an account?
                    </Typography>

                    <Link
                      component="button"
                      type="button"
                      underline="hover"
                      onClick={() =>
                        navigate("/login")
                      }
                      sx={{
                        border: 0,

                        background: "none",

                        cursor: "pointer",

                        fontSize: "0.875rem",

                        fontWeight: 600,
                      }}
                    >
                      Sign in
                    </Link>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>

          {/* Security */}

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.75}
            sx={{
              mt: 4,

              color: "text.disabled",
            }}
          >
            <ShieldCheck size={14} />

            <Typography variant="caption">
              Your account information is securely protected
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;