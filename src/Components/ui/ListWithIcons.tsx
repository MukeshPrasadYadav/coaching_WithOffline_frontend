// src/Components/ui/ListWithIcons.tsx
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { ReactNode } from "react";

export interface CoachingItem {
  id: string;
  name: string;
  location: string;
  type: "Primary" | "Secondary";
}

interface CoachingListCardProps {
  title: string;
  coachings: CoachingItem[];
  onViewAll?: () => void;
}

const CoachingListCard = ({
  title,
  coachings,
  onViewAll,
}: CoachingListCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Typography fontWeight={700} mb={2}>
        {title}
      </Typography>

      <Stack spacing={2}>
        {coachings.map((coaching, index) => (
          <Box key={coaching.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                {/* <Avatar
                  src={coaching.logo}
                  sx={{
                    width: 46,
                    height: 46,
                  }}
                /> */}

                <Box>
                  <Typography
                    fontWeight={600}
                    fontSize={14}
                  >
                    {coaching.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {coaching.location}
                  </Typography>
                </Box>
              </Stack>

              <Chip
                label={coaching.type}
                size="small"
                color={
                  coaching.type === "Primary"
                    ? "success"
                    : "primary"
                }
                sx={{
                  fontWeight: 600,
                }}
              />
            </Stack>

            {index !== coachings.length - 1 && (
              <Divider sx={{ mt: 2 }} />
            )}
          </Box>
        ))}
      </Stack>

      <Button
        fullWidth
        variant="text"
        onClick={onViewAll}
        endIcon={<ArrowForwardRoundedIcon />}
        sx={{
          mt: 2.5,
          py: 1.3,
          borderRadius: 2,
          bgcolor: "#F8F9FF",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            bgcolor: "#EEF2FF",
          },
        }}
      >
        View All Coaching Centers
      </Button>
    </Card>
  );
};

export default CoachingListCard;