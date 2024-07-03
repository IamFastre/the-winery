import CSS from "csstype";
import styles from "./style.module.scss";


export interface SectionProps {
  title?: string;
  children?: React.ReactNode;

  style?: CSS.Properties;
  containerStyle?: CSS.Properties;

  className?: string;
  containerClassName?: string;

  noFlex?: boolean;
  isCard?: boolean;
  centered?: boolean;
}

export function Section(props:SectionProps) : React.JSX.Element {
  return (
    <div
      className={`${styles.background} ${props.className} ${props.isCard ? styles.card : ""}`}
      style={props.style}
    >
      { props.title
      ? <div
          className={`${styles.title} ${props.centered ? styles.centered : ""}`}
        >
          <div className={styles.titleBG} />
          <div className={styles.titleText}>
            {props.title}
          </div>
        </div>
      : null }
      <div
        className={`${styles.container} ${props.noFlex ? "" : styles.flex} ${props.containerClassName}`}
        style={props.containerStyle}
      >
        {props.children}
      </div>
    </div>
  );
}
