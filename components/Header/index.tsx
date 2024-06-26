import CSS from "csstype";

import { Section } from "@/components";
import styles from "./style.module.scss";

export interface HeaderProps {
  title?: string;
  height?: CSS.Property.Height;
  margin?: CSS.Property.Margin;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header(props:Readonly<HeaderProps>) {
  return (
    <Section style={{ height: props.height ?? "100px" }}>
      <div className={styles.container}>

        <div className={styles.children} style={{ left: props.margin ?? 0 }}>
          {props.left}
        </div>

        <div className={styles.title}>
          <span>
            {"•-{"}
          </span>

          <span className={styles.text}>
            {props.title}
          </span>

          <span>
            {"}-•"}
          </span>
        </div>

        <div className={styles.children} style={{ right: props.margin ?? 0 }}>
          {props.right}
        </div>

      </div>
    </Section>
  );
}
