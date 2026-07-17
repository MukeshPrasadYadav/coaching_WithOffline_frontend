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
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "20px",
        minWidth: 0,
        width: "100%",
        boxShadow: "0 4px 16px rgba(15,23,42,0.06)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-2px)";
        event.currentTarget.style.boxShadow = "0 8px 22px rgba(15,23,42,0.08)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.boxShadow = "0 4px 16px rgba(15,23,42,0.06)";
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
            fontWeight: 600,
            color: "#6B7280",
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "26px",
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.2,
          }}
        >
          {value}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          {subTitle}
        </p>
      </div>
    </div>
  );

};

export default AnalyticsCard;
