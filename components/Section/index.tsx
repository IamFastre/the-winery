import CSS from "csstype";
import styles from "./style.module.scss";

export interface SectionProps {
  title?: string;
  children?: React.ReactNode;
  style?: CSS.Properties;
  containerStyle?: CSS.Properties;

  isCard?: boolean;
  centered?: boolean;
}

export function Section(props:SectionProps) : React.JSX.Element {
  return (
    <div
      className={`${styles.background} ${props.isCard ? "card" : ""}`}
      style={props.style}
    >
      { props.title
      ? <div
          className={`${styles.title} ${props.centered ? "centered" : ""}`}
        >
          <div className={styles.titleBG} />
          <div className={styles.titleText}>
            {props.title}
          </div>
        </div>
      : null }
      <div
        className={styles.container}
        style={props.containerStyle}
      >
        {props.children}
      </div>
    </div>
  );
}
