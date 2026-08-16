// src/Components/PanelsWithForms/BatchForm.tsx
import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomDrawer from "../ui/CustomDrawer";
import { useGetTeacherByCoaching } from "../../hooks/teacher.hooks";
import { useCoachingStore } from "../../store/coaching.store";
import { useAddBatch } from "../../hooks/batch.hooks";
import type { AddBatchRequest } from "../../services/BatchService";
import { useAuthStore } from "../../store/auth.store";
import React from "react"

type FormType = "Add" | "Update";

interface BatchFormProps {
  type: FormType;
  open: boolean;
  batchId: string | null;
  closeModal: () => void;
}



const initialValues: AddBatchRequest = {
  name: "",
  startDate: "",
  endDate: "",
  startTime : null,
  endTime : null,
  fee: "",
  teachers: [],
  subjects: [],
  description: "",
};

const batchValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Batch name is required")
    .max(100),

  startDate: Yup.date()
    .required("Start date is required"),

  endDate: Yup.date()
    .required("End date is required")
    .min(
      Yup.ref("startDate"),
      "End date must be after start date"
    ),

    startTime : Yup.date()
    .required("start timing is required"),

    endTime : Yup.date()
    .required("Ending time is required")
    .min(
      Yup.ref("startTime")
    ),

    

  fee: Yup.number()
    .typeError("Fee is required")
    .positive("Fee must be greater than 0")
    .required("Fee is required"),

  teachers: Yup.array()
    .min(1, "Select at least one teacher"),

  subjects: Yup.array(),

  description: Yup.string()
    .trim()
    .max(500),
});

const BatchForm = ({ open, closeModal, batchId }: BatchFormProps) => {
  const coaching = useCoachingStore((state) => state.coaching);
  const user = useAuthStore((state) => state.user);
  console.log("coaching",coaching)

  const { data, isPending } = useGetTeacherByCoaching(coaching?.id ?? user?.id ?? "" ,open);
  const {mutate : addBatch} = useAddBatch(closeModal);
 
  const teachers: any[] = data ?? [];

  return (
    <CustomDrawer
    open={open}
    onClose={closeModal}
    title={batchId ? "Update Batch" : "Add Batch"}
    size="lg"
    anchor="right"
  >
    <Formik
  initialValues={initialValues}
  validationSchema={batchValidationSchema}
  onSubmit={(values) => {

    const payLoad = {
      ...values,
      startDate: values.startDate,
      endDate: values.endDate,
      startTime : values.startTime?.format("HH:mm:ss") ?? null,
      endTime : values.endTime?.format("HH:mm:ss") ?? null,
    };

    addBatch({
      coachingId: coaching?.id ?? "",
      request: payLoad,
    });
  }}
>
  {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  }) => {

    const allSubjects = [
      ...new Set(
        teachers.flatMap((teacher) => teacher.subjects)
      ),
    ];

    const filteredSubjects =
      values.teachers.length === 0
        ? allSubjects
        : [
            ...new Set(
              teachers
                .filter((teacher) =>
                  values.teachers.includes(teacher.id)
                )
                .flatMap((teacher) => teacher.subjects)
            ),
          ];

    const filteredTeachers =
      values.subjects.length === 0
        ? teachers
        : teachers.filter((teacher) =>
            values.subjects.every((subject) =>
              teacher.subjects.includes(subject)
            )
          );

    return (
      <Form>
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                variant="standard"
                label="Batch Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                variant="standard"
                label="Fee"
                name="fee"
                type="number"
                value={values.fee}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.fee && errors.fee)}
                helperText={touched.fee && errors.fee}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                variant="standard"
                label="Start Date"
                name="startDate"
                type="date"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(
                  touched.startDate && errors.startDate
                )}
                helperText={
                  touched.startDate && errors.startDate
                }
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                variant="standard"
                label="End Date"
                name="endDate"
                type="date"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(
                  touched.endDate && errors.endDate
                )}
                helperText={
                  touched.endDate && errors.endDate
                }
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <TimePicker
  label="Start time"
  name ="startTime"
  value={values.startTime}
  onChange={(newValue) => setFieldValue("startTime",newValue)}
/>
</Grid>

 <Grid size={{ xs: 12, md: 6 }} >
                <TimePicker
  label="End time"
  name ="endTime"
  value={values.endTime}
  onChange={(newValue) => setFieldValue("endTime",newValue)}
/>



            </Grid>

            {/* Teachers */}
            <Grid size={12}>
              <Autocomplete
                multiple
                options={filteredTeachers}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                value={filteredTeachers.filter((teacher) =>
                  values.teachers.includes(teacher.id)
                )}
                onChange={(_, value) => {
                  setFieldValue(
                    "teachers",
                    value.map((teacher) => teacher.id)
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Teachers"
                    error={Boolean(
                      touched.teachers && errors.teachers
                    )}
                    helperText={
                      touched.teachers &&
                      (errors.teachers as string)
                    }
                  />
                )}
              />
            </Grid>

            {/* Subjects */}
            <Grid size={12}>
              <Autocomplete
  multiple
  freeSolo
  options={filteredSubjects}
  value={values.subjects}
  onChange={(_, value) => {
    setFieldValue("subjects", value);
  }}
  filterSelectedOptions
  renderInput={(params) => (
    <TextField
      {...params}
      variant="standard"
      label="Subjects"
      placeholder="Select or type a subject"
      error={Boolean(touched.subjects && errors.subjects)}
      helperText={
        touched.subjects && (errors.subjects as string)
      }
    />
  )}
/>
            
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                variant="standard"
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(
                  touched.description &&
                    errors.description
                )}
                helperText={
                  touched.description &&
                  errors.description
                }
              />
            </Grid>
          </Grid>

          <div className="flex justify-end gap-2">
            <Button
            disabled = {isPending}
              variant="outlined"
              onClick={closeModal}
            >
              Cancel
            </Button>

            <Button
              disabled = {isPending}
              variant="contained"
              type="submit"
            >
              {batchId ? "Update Batch" : "Add Batch"}
            </Button>
          </div>
        </Stack>
      </Form>
    );
  }}
</Formik>
  </CustomDrawer>
  );
};

export default React.memo(BatchForm);
