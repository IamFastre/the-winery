import { CSSProperties } from "react";

import { Section } from "@/components/Section";
import styles from "./style.module.scss";


export interface HeaderProps {
  title?: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
  height?: CSSProperties['height'];
  margin?: CSSProperties['margin'];
  left?: React.ReactNode;
  right?: React.ReactNode;
  noBrackets?: boolean;
  isCard?: boolean;
}

export function Header(props:Readonly<HeaderProps>) {
  return (
    <Section style={{ height: props.height ?? "100px" }} isCard={props.isCard}>
      <div className={styles.container}>
        <div className={styles.children} style={{ left: props.margin ?? 0 }}>
          {props.left}
        </div>
        <div className={styles.middle}>
          <div className={`${styles.title} ${props.noBrackets ? '' : styles.brackets}`}>
            <span style={{ color: props.titleColor }}>
              {props.title}
            </span>
          </div>
          <div className={styles.subtitle}>
            {
              props.subtitle &&
                <span className={styles.text} style={{ color: props.subtitleColor }}>
                  {props.subtitle}
                </span>
            }
          </div>
        </div>
        <div className={styles.children} style={{ right: props.margin ?? 0 }}>
          {props.right}
        </div>
      </div>
    </Section>
  );
}
