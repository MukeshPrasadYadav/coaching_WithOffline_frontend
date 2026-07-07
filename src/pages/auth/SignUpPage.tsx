// src/pages/auth/SignUpPage.tsx
// src/pages/auth/LoginPage.tsx

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Card } from "../../Components/ui";
import { Button, TextField, Stack, Typography,  MenuItem } from "@mui/material";
import { useSignUp } from "../../hooks/auth.hooks";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
    role: Yup.string()
    .required("role is required"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {mutate:signUp,isPending} = useSignUp();
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <Card
        size="small"
        title="Create Account"
        subtitle="Sign up to get started"
      >
        <Formik
          initialValues={{
            name:"",
            email: "",
            password: "",
            role: ""
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            signUp(values)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur
          }) => (
            <Form>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                
                <TextField
                  select
                  fullWidth
                  label="Role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                >
                <MenuItem value="TEACHER">Teacher</MenuItem>
                <MenuItem value="STUDENT">Student</MenuItem>
                <MenuItem value="PARENT">Parent</MenuItem>
                <MenuItem value="ADMIN">Coaching</MenuItem>
              </TextField>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isPending}
                >
                  {isPending? "Signing up" : "Sign up"}
                </Button>

                <Button
                    onClick={() => navigate("/login")}
                     variant="text">
                      Already have account?
                    </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignUpPage;