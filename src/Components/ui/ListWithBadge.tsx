// src/Components/ui/ListWithBadge.tsx
import {
  Avatar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface ListItemData {
  id: string | number;
  avatar?: string;
  primary: string;
  secondary?: string;

  chipLabel?: string;
  chipColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
}

interface ListWithBadgeProps {
  title: string;
  items: ListItemData[];

  buttonText?: string;

  onItemClick?: (item: ListItemData) => void;
  onButtonClick?: () => void;
}

const ListWithBadge = ({
  title,
  items,
  buttonText,
  onItemClick,
  onButtonClick,
}: ListWithBadgeProps) => {
  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
      >
        {title}
      </Typography>

      <List disablePadding>
        {items.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ mb: 1 }}
          >
            <ListItemButton
              onClick={() => onItemClick?.(item)}
            >
              <ListItemAvatar>
                <Avatar src={item.avatar}>
                  {item.primary.charAt(0)}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={item.primary}
                secondary={item.secondary}
              />
            </ListItemButton>

            {item.chipLabel && (
              <Chip
                size="small"
                label={item.chipLabel}
                color={item.chipColor}
              />
            )}
          </ListItem>
        ))}
      </List>

      {buttonText && (
        <Stack mt={2}>
          <Button
            variant="text"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default ListWithBadge;