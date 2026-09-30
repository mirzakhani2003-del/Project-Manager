import type { SelectHTMLAttributes } from "react";
import styles from "./select.module.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

const Select = ({
  label,
  error,
  options,
  id,
  className = "",
  ...props
}: SelectProps) => {
  const selectId = id ?? props.name;

  const selectClassName = [
    styles.select,
    error ? styles.errorSelect : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}

      <select id={selectId} className={selectClassName} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Select;
