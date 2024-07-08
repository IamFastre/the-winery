import CSS from "csstype";
import styles from "./style.module.scss";
import { HTMLAttributes } from "react";


export interface SectionProps {
  title?: string | React.ReactElement;
  children?: React.ReactNode;

  style?: CSS.Properties;
  containerStyle?: CSS.Properties;

  className?: string;
  containerClassName?: string;

  attrs?: HTMLAttributes<HTMLDivElement>;
  containerAttrs?: HTMLAttributes<HTMLDivElement>;

  titleColor?: CSS.Property.Color;
  noFlex?: boolean;
  isCard?: boolean;
  centered?: boolean;
}

export function Section(props:SectionProps) : React.JSX.Element {
  return (
    <div
      className={`${styles.background} ${props.className} ${props.isCard ? styles.card : ""}`}
      style={props.style}
      {...props.attrs}
    >
      { props.title
      ? <div
          className={`${styles.title} ${props.centered ? styles.centered : ""}`}
        >
          <div className={styles.titleBG} />
          <span className={styles.titleText} style={props.titleColor ? { color: props.titleColor } : { }}>
            {props.title}
          </span>
        </div>
      : null }
      <div
        className={`${styles.container} ${props.noFlex ? "" : styles.flex} ${props.containerClassName}`}
        style={props.containerStyle}
        {...props.containerAttrs}
      >
        {props.children}
      </div>
    </div>
  );
}
