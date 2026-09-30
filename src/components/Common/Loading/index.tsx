import styles from "./loading.module.scss";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

function Loading({ size = "md", label = "Loading..." }: LoadingProps) {
  return (
    <div className={styles.wrapper} role="status" aria-label={label}>
      <span className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
}

export default Loading;
