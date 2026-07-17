// src/Components/dashboard/SubjectCard.tsx
import { Avatar, Box, Divider, Stack, Typography, alpha, useTheme } from '@mui/material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import DashboardSection from './DashboardSection';
import EmptyState from './EmptyState';
import type { SubjectTeaching } from '../../types/dashboard';

interface SubjectCardProps {
  title: string;
  subjects: SubjectTeaching[];
  buttonText?: string;
  onButtonClick?: () => void;
}

const SubjectCard = ({ title, subjects, buttonText, onButtonClick }: SubjectCardProps) => {
  const theme = useTheme();

  return (
    <DashboardSection title={title} buttonText={buttonText} onButtonClick={onButtonClick}>
      {subjects.length === 0 ? (
        <EmptyState title="No subjects" description="Subject assignments will appear here." />
      ) : (
        <Stack divider={<Divider flexItem />} spacing={2}>
          {subjects.map((subject) => (
            <Stack key={subject.id} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  color: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <MenuBookOutlinedIcon />
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {subject.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {subject.classRange}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 800, whiteSpace: 'nowrap' }}>
                {subject.classesCount} Classes
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </DashboardSection>
  );
};

export default SubjectCard;
