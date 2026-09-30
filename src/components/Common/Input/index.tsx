import type { InputHTMLAttributes } from "react";
import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, id, className = "", ...props }: InputProps) => {
  const inputId = id ?? props.name;

  const inputClassName = [
    styles.input,
    error ? styles.errorInput : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <input id={inputId} className={inputClassName} {...props} />

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;
