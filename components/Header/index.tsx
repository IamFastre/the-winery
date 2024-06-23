import CSS from "csstype";
import { Section } from "@/components";
import "./style.scss";

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
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

        <div className="header-children" style={{ left: props.margin ?? 0 }}>
          {props.left}
        </div>

        <span id="header-title">
          <span>
            {"•-{ "}
          </span>

          <span id="header-title-text">
            {props.title}
          </span>

          <span>
            {" }-•"}
          </span>
        </span>

        <div className="header-children" style={{ right: props.margin ?? 0 }}>
          {props.right}
        </div>

      </div>
    </Section>
  );
}
