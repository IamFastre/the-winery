import { ReactEventHandler } from "react";
import CSS from "csstype";
import './style.scss';

export interface SectionProps {
  title?: string;
  style?: CSS.Properties;
  children?: React.ReactNode;
  containerStyle?: CSS.Properties;
  isCard?: boolean;
  centered?: boolean;
}

export function Section(props:SectionProps) : React.JSX.Element {
  return (
    <div
      id="background"
      style={props.style}
      className={props.isCard ? "card" : ""}
    >
      { props.title
      ? <div
          id="header"
          className={props.centered ? "centered" : ""}
        >
          <div id="header-bg"/>
          <div id="header-text">
            {props.title}
          </div>
        </div>
      : null }
      <div
        id="container"
        style={props.containerStyle}
      >
        {props.children}
      </div>
    </div>
  );
}
