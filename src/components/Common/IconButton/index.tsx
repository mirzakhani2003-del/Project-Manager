import type { ButtonHTMLAttributes } from "react";
import styles from "./iconButton.module.scss";

type IconButtonVariant = "default" | "primary" | "danger" | "ghost";

type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const IconButton = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}: IconButtonProps) => {
  const buttonClassName = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={buttonClassName} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
