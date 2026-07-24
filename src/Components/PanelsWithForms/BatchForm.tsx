// src/Components/PanelsWithForms/BatchForm.tsx

import { Autocomplete, Button, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import CustomDrawer from '../ui/CustomDrawer';
import * as Yup from "yup";
import { useCoachingStore } from '../../store/coaching.store';

export const DaysOfWeek = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
} as const;

export interface TeacherInfo{
    id : string | null,
    name : string | null,
    subjects : string[] | []
    experience : number 
}

export type DaysOfWeek = typeof DaysOfWeek[keyof typeof DaysOfWeek];

interface BatchFormValues {
    name: string;

    classRoomId: string;

    teacherId: string;

    subjectId: string;

    fee: number;

    days: DaysOfWeek[];

    timing: {
        startTime: string;
        endTime: string;
    };
}
type FormType = "Add" | "Update";
interface BatchFormProps {
  type: FormType;
  open: boolean;
  batchId: string | null;
  closeModal: () => void;
}

const schema = Yup.object({});



const BatchForm = ({ open, closeModal, batchId }: BatchFormProps) => {

    const coaching = useCoachingStore((state) => state.coaching);
    const teachers = coaching?.teachers ?? [];
    console.log("coachingId",coaching)
  return (
    <CustomDrawer
    open={open}
    onClose={closeModal}
    title={batchId ? "Update Batch" : "Add Batch"}
    size="lg"
    anchor="right"
>
    <Formik
        initialValues={{
  name: "",
  fee: "",

  classRoomId: "",

  teacherId: "",

  subject: "",

  days: [],

  timing: null,
}}
        validationSchema={schema}
        onSubmit={(values) => {
            console.log(values);
        }}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
        }) => (
            <Form>
                <Stack spacing={4}>

                    {/* ========================= */}
                    {/* Batch Information */}
                    {/* ========================= */}

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
                                type="number"
                                variant="standard"
                                label="Monthly Fee"
                                name="fee"
                                value={values.fee}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.fee && errors.fee)}
                                helperText={touched.fee && errors.fee}
                            />
                        </Grid>

                    </Grid>

                    <Divider />

                    {/* ========================= */}
                    {/* Classroom */}
                    {/* ========================= */}

                    <Grid container spacing={3}>

                        <Grid size={12}>

                            <Autocomplete
                                options={["A1","B1"]}
                                value={null}
                                onChange={(_, value) => {
                                    setFieldValue("classRoom", value);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Classroom"
                                    />
                                )}
                            />

                        </Grid>

                    </Grid>

                    <Divider />

                    {/* ========================= */}
                    {/* Teacher */}
                    {/* ========================= */}

                    <Grid container spacing={3}>

                        <Grid size={12}>

                           <Autocomplete
  options={teachers}
  getOptionLabel={(option) => option.name}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  value={teachers.find((t) => t.id === values.teacherId) ?? null}
  onChange={(_, value) => {
    setFieldValue("teacherId", value?.id ?? "");
    if(value?.id){
        // api call to get teacher
    }

  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select Teacher"
    />
  )}
/>

                        </Grid>

                    </Grid>

                    {/* ========================= */}
                    {/* Teacher Information */}
                    {/* ========================= */}

                   {
                    values.teacherId && 
                     <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2
                        }}
                    >

                        <Typography variant="h6">
                            Teacher Information
                        </Typography>

                        <Stack spacing={1} mt={2}>

                            <Typography>

                                Name :

                            </Typography>

                            <Typography>

                                Experience :

                            </Typography>

                            <Typography>

                                Subjects :

                            </Typography>

                        </Stack>

                    </Paper>
                   }

                    <Divider />

                    {/* ========================= */}
                    {/* Subject */}
                    {/* ========================= */}

                    <Grid container spacing={3}>

                        <Grid size={12}>

                            <Autocomplete
                                options={[]}
                                value={null}
                                onChange={(_, value) => {

                                    setFieldValue("subject", value);

                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Subject"
                                    />
                                )}
                            />

                        </Grid>

                    </Grid>

                    <Divider />

                    {/* ========================= */}
                    {/* Schedule */}
                    {/* ========================= */}

                    <Typography variant="h6">
                        Batch Schedule
                    </Typography>

                    {/* Day Selector */}

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2
                        }}
                    >

                        {/* Checkbox Group */}

                    </Paper>

                    {/* Available Timings */}

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2
                        }}
                    >

                        {/* Radio Cards */}

                    </Paper>

                    <Divider />

                    {/* ========================= */}
                    {/* Summary */}
                    {/* ========================= */}

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2
                        }}
                    >

                        <Typography variant="h6">
                            Batch Summary
                        </Typography>

                        <Stack spacing={1} mt={2}>

                            <Typography>

                                Batch :

                            </Typography>

                            <Typography>

                                Teacher :

                            </Typography>

                            <Typography>

                                Subject :

                            </Typography>

                            <Typography>

                                Classroom :

                            </Typography>

                            <Typography>

                                Fee :

                            </Typography>

                            <Typography>

                                Days :

                            </Typography>

                            <Typography>

                                Timing :

                            </Typography>

                        </Stack>

                    </Paper>

                    <div className="flex justify-end gap-2">

                        <Button
                            variant="outlined"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            type="submit"
                        >
                            {batchId ? "Update Batch" : "Add Batch"}
                        </Button>

                    </div>

                </Stack>
            </Form>
        )}
    </Formik>
</CustomDrawer>
  )
}

export default BatchForm