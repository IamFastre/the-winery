import Image from "next/image";
import CSS from 'csstype';

import { useGoTo } from "@/hooks";

import NDC from "@/public/static/images/NaipeDeCopas.png";
import styles from "./style.module.scss";

export interface HomeIconProps {
  className:string;
  style?:CSS.Properties;
  redirecting?:boolean;
  goto?: (str:string) => void;
}

export function GoHomeLogo(props:HomeIconProps) {
  let useHook = true;

  if (props.redirecting === undefined && props.goto !== undefined || props.redirecting !== undefined && props.goto === undefined)
    throw new Error("Can't have one but now the other");
  else if (props.redirecting !== props.goto)
    useHook = false;

  const [redirecting, goto] = useHook ? useGoTo() : [props.redirecting!, props.goto!];

  return (
    <div
      className={`${styles.image} ${redirecting ? styles.redirecting : ""} ${props.className}`}
      style={props.style}
      onClick={() => goto('/home')}
    >
      <Image
        src={NDC}
        alt="the Winery logo; a purple heart suit with a sharp spiky hexagram on top"
        priority
      />
    </div>
  );
}
