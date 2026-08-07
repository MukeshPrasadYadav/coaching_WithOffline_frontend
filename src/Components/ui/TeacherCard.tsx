// src/Components/ui/TeacherCard.tsx
import { Avatar, Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

interface TeacherCardProps {
  teacher: {
    id: string;
    name: string;
    profilePicture?: string | null;
    degrees: string[];
    subjects: string[];
    experience: number;
  };
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ py: 2, px: 2.5, "&:last-child": { pb: 2 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          {/* Left: Avatar + Info */}
          <Stack direction="row" spacing={2} alignItems="center" flex={1} minWidth={0}>
            <Avatar
              src={teacher.profilePicture || ""}
              sx={{ width: 52, height: 52 }}
            />

            <Box flex={1} minWidth={0}>
              {/* Name */}
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {teacher.name}
              </Typography>

              {/* Degrees */}
              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ mt: 0.4 }}
              >
                {teacher.degrees?.length
                  ? teacher.degrees.join(", ")
                  : "Not Available"}
              </Typography>

              {/* Subjects */}
              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ mt: 0.2 }}
              >
                {teacher.subjects?.join(", ") || "—"}
              </Typography>
            </Box>
          </Stack>

          {/* Right: Experience */}
          <Chip
            label={`${teacher.experience}+ Years`}
            size="small"
            variant="outlined"
            sx={{
              fontWeight: 500,
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;