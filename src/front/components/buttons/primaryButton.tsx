"use client";
import { Button } from "@mui/material";

interface IButtonProps {
  text: string;
  onClick: () => any;
  startIcon?: string;
  endIcon?: string;
  variant?: "tonal" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
}
export default function PrimaryButton({
  text,
  onClick,
  startIcon,
  endIcon,
  variant = "contained",
  size,
  color,
}: IButtonProps) {
  return (
    <Button
      variant={variant}
      endIcon={endIcon && <i className={`${endIcon.startsWith("tabler") ? endIcon : `tabler-${endIcon}`}`} />}
      startIcon={startIcon && <i className={`${startIcon.startsWith("tabler") ? startIcon : `tabler-${startIcon}`}`} />}
      size={size}
      onClick={onClick}
      color={color}
    >
      <strong>{text}</strong>
    </Button>
  );
}
