import styles from "./style.module.scss";

interface Props {
  text?: string;
  compact?: boolean;
  className?: string;
}

export function LoadingText(props:Props) {
  return (
    <span className={`${styles.loading} ${props.className ? props.className : ""}`}>
      <span>
        {props.compact ? "" : props.text ?? "Loading"}
      </span>
      <span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </span>
  );
}