// src/Components/dashboard/DegreeCard.tsx
import { Box, Divider, Stack, Typography } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DashboardSection from './DashboardSection';
import EmptyState from './EmptyState';
import type { Degree } from '../../types/dashboard';

interface DegreeCardProps {
  title: string;
  degrees: Degree[];
  buttonText: string;
  onButtonClick?: () => void;
}

const DegreeCard = ({ title, degrees, buttonText, onButtonClick }: DegreeCardProps) => {
  return (
    <DashboardSection title={title} buttonText={buttonText} onButtonClick={onButtonClick}>
      {degrees.length === 0 ? (
        <EmptyState title="No degrees added" description="Add degrees to complete your teaching profile." />
      ) : (
        <Stack divider={<Divider flexItem />} spacing={2}>
          {degrees.map((degree) => (
            <Stack key={degree.id} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2.5,
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'action.hover',
                  color: 'primary.main',
                  flexShrink: 0,
                }}
              >
                <SchoolOutlinedIcon />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {degree.degree}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {degree.university}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {degree.year}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </DashboardSection>
  );
};

export default DegreeCard;
