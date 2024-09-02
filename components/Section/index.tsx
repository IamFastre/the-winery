import { CSSProperties, HTMLAttributes } from "react";

import styles from "./style.module.scss";


export interface SectionProps {
  title?: string | React.ReactElement | null;
  children?: React.ReactNode;

  style?: CSSProperties;
  containerStyle?: CSSProperties;

  className?: string;
  containerClassName?: string;

  attrs?: HTMLAttributes<HTMLDivElement>;
  containerAttrs?: HTMLAttributes<HTMLDivElement>;

  titleColor?: CSSProperties['color'];
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
