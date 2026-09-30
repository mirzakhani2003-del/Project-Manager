import type { TextareaHTMLAttributes } from "react";
import styles from "./textarea.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = ({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) => {
  const textareaId = id ?? props.name;

  const textareaClassName = [
    styles.textarea,
    error ? styles.errorTextarea : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}

      <textarea id={textareaId} className={textareaClassName} {...props} />

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Textarea;
