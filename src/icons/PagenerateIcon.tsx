import { SvgIcon, SvgIconProps } from "@mui/material";

export const PagenerateIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 200 200" {...props}>
    {/* Inner gradient circle with teal gradient */}
    <circle cx="100" cy="100" r="75" fill="url(#teal-gradient)" />

    {/* Page Base Shape */}
    <path
      d="M60 50 L140 50 L140 150 L60 150 Z"
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth="2"
    />

    {/* Page fold corner */}
    <path
      d="M140 50 L120 50 L140 70 Z"
      fill="#E0E0E0"
      stroke="#CCCCCC"
      strokeWidth="1"
    />
    <path
      d="M120 50 L140 70 L120 70 Z"
      fill="#F5F5F5"
      stroke="#CCCCCC"
      strokeWidth="1"
    />

    {/* Content lines - adjusted color to match theme */}
    <rect
      x="70"
      y="70"
      width="50"
      height="5"
      rx="2"
      fill="#11998E"
      opacity="0.7"
    />
    <rect
      x="70"
      y="85"
      width="60"
      height="5"
      rx="2"
      fill="#11998E"
      opacity="0.5"
    />
    <rect
      x="70"
      y="100"
      width="40"
      height="5"
      rx="2"
      fill="#11998E"
      opacity="0.7"
    />

    {/* Call to action button - adjusted to complement the teal theme */}
    <rect x="70" y="120" width="50" height="15" rx="7" fill="#FF6B4A" />

    {/* Magic wand elements */}
    <line
      x1="145"
      y1="60"
      x2="160"
      y2="45"
      stroke="#FFD700"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="162" cy="43" r="4" fill="#FFD700" />

    {/* Sparkles */}
    <circle cx="168" cy="48" r="1.5" fill="#FFD700" />
    <circle cx="173" cy="43" r="1" fill="#FFD700" />
    <circle cx="165" cy="33" r="1.2" fill="#FFD700" />
    <circle cx="155" cy="38" r="1" fill="#FFD700" />

    {/* "P" letter mark */}
    <path
      d="M42 85 Q42 75, 52 75 L65 75 Q75 75, 75 85 Q75 95, 65 95 L52 95 L52 125"
      stroke="#FFFFFF"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Gradient definition */}
    <defs>
      <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#11998E" />
        <stop offset="100%" stopColor="#38EF7D" />
      </linearGradient>
    </defs>
  </SvgIcon>
);
