// src/pages/auth/LoginPage.tsx
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Card } from "../../Components/ui";           // Make sure path is correct
import { Button, TextField, Stack, Typography, Link } from "@mui/material";

import { useLogin } from "../../hooks/auth.hooks";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-neutral-950 p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <Typography variant="h4" className="font-semibold mb-2">
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to continue to your account
            </Typography>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
             login(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={isPending}
                  >
                    {isPending ? "Signing In..." : "Sign In"}
                  </Button>

                  <div className="text-center">
                    <Link href="#" underline="hover" color="primary">
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <Button
                    onClick={() => navigate("/signup")}
                     variant="text">
                      Don't have account?
                    </Button>
                  </div>
                </Stack>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;