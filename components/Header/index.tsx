import CSS from "csstype";

import { Section } from "@/components/Section";
import styles from "./style.module.scss";


export interface HeaderProps {
  title?: string;
  titleColor?: string;
  height?: CSS.Property.Height;
  margin?: CSS.Property.Margin;
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

        <div className={styles.title}>
          {
            props.noBrackets ? null :
            <span>
              {"•-{"}
            </span>
          }

          <span className={styles.text} style={{ color: props.titleColor }}>
            {props.title}
          </span>
          {
            props.noBrackets ? null :
            <span>
              {"}-•"}
            </span>
          }
        </div>

        <div className={styles.children} style={{ right: props.margin ?? 0 }}>
          {props.right}
        </div>

      </div>
    </Section>
  );
}
