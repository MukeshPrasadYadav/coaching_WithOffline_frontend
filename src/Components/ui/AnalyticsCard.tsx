// src/Components/ui/AnalyticsCard.tsx

import type { ReactNode } from "react";
import Icon from "../Icons";
import type { LucideIcon } from "lucide-react";


interface AnalyticsCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  subTitle : string;
  iconBg :string;
  iconColor:string;
}

const AnalyticsCard = ({
  icon,
  title,
  value,
  subTitle,
  iconBg,
  iconColor
}: AnalyticsCardProps) => {
  
return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        background: "#FFFFFF",
        border: "1px solid #ECECEC",
        borderRadius: "16px",
        padding: "20px 24px",
        width: "280px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon icon={icon} size={22} color={iconColor} strokeWidth={2} />
      </div>
 
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: 500,
            color: "#8A8A8E",
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "26px",
            fontWeight: 700,
            color: "#1A1A1E",
            lineHeight: 1.2,
          }}
        >
          {value}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "12px",
            color: "#A5A5AA",
          }}
        >
          {subTitle}
        </p>
      </div>
    </div>
  );

};

export default AnalyticsCard;