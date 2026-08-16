// src/Components/ui/ProfileSectionCard.tsx
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { type ReactNode } from "react";

interface ProfileSectionCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  photoSection?: ReactNode;
  children: ReactNode;
}



 export default function ProfileSectionCard({
  icon,
  title,
  subtitle,
  photoSection,
  children,
}: ProfileSectionCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <div className="flex gap-8">
          {/* Left Side */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                {icon}
              </div>

              <div>
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {subtitle}
                </Typography>
              </div>
            </div>

            {/* Dynamic Form */}
            {children}
          </div>

          {/* Right Side */}
          {photoSection && (
            <div className="w-56 border-l pl-8 flex items-center justify-center">
              {photoSection}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
