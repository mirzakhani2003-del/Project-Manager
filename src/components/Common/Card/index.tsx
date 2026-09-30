import type { HTMLAttributes } from "react";
import styles from "./card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = ({
  padding = "md",
  className = "",
  children,
  ...props
}: CardProps) => {
  const cardClassName = [styles.card, styles[padding], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClassName} {...props}>
      {children}
    </div>
  );
};

export default Card;
