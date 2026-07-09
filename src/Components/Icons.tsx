// src/Components/Icons.tsx
import type { LucideIcon } from "lucide-react";
 
interface IconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}
 
export default function Icon({
  icon: IconComponent,
  size = 22,
  color = "currentColor",
  strokeWidth = 2,
  className,
}: IconProps) {
  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}
 