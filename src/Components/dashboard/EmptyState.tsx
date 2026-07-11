// src/Components/dashboard/EmptyState.tsx
import { Box, Typography } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        minHeight: 132,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        color: 'text.secondary',
        textAlign: 'center',
      }}
    >
      <InboxOutlinedIcon color="disabled" />
      <Typography variant="subtitle2" color="text.primary">
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      ) : null}
    </Box>
  );
};

export default EmptyState;
