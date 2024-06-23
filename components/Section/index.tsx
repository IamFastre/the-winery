import CSS from "csstype";
import './style.scss';

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
      id="section-background"
      style={props.style}
      className={props.isCard ? "card" : ""}
    >
      { props.title
      ? <div
          id="section-title"
          className={props.centered ? "centered" : ""}
        >
          <div id="section-title-bg"/>
          <div id="section-title-text">
            {props.title}
          </div>
        </div>
      : null }
      <div
        id="section-container"
        style={props.containerStyle}
      >
        {props.children}
      </div>
    </div>
  );
}
