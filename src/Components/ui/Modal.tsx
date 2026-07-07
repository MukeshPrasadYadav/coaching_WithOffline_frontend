// src/Components/ui/Modal.tsx
import type { ReactNode } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

type AppDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
};

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
}: AppDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          overflow: 'hidden',
        },
      }}
    >
      {(title || description) && (
        <DialogTitle sx={{ pb: 1.5 }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
            <Box>
              {title && (
                <Typography variant="h6" component="div">
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="body2" color="text.secondary" mt={0.75}>
                  {description}
                </Typography>
              )}
            </Box>
            <IconButton onClick={onClose} aria-label="Close modal" sx={{ mt: -0.5, mr: -0.5 }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
      )}
      <DialogContent sx={{ pt: title || description ? 0 : 3 }}>
        {children}
      </DialogContent>
      {actions && <DialogActions sx={{ px: 3, pb: 3 }}>{actions}</DialogActions>}
    </Dialog>
  );
}

export default Modal;
