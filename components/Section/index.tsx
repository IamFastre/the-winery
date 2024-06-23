import { ReactEventHandler } from "react";
import CSS from "csstype";
import './style.scss';

export interface SectionProps {
  title?: string;
  style?: CSS.Properties;
  containerStyle?: CSS.Properties;
  titleStyle?: CSS.Properties;
  children?: React.ReactNode;
  isCard?: boolean;
  centered?: boolean;
  scrollable?: boolean;
  stickyIndices?: number[];
  bg?: CSS.Property.Color;
  onLoad?: ReactEventHandler<HTMLDivElement>;
}

export function Section(props:SectionProps) : React.JSX.Element {
  return (
    <div
      id="background"
      style={props.style}
      onLoad={props.onLoad}
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
      <div id="container">
        {props.children}
      </div>
    </div>
  );
}
