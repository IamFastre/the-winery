"use client";
import { CSSProperties, useEffect, useState } from "react";
import Image from "next/image";

import consts from "@/utils/consts";
import { getLogo, LogoKind } from "@/utils";
import { useGoTo } from "@/hooks";

import styles from "./style.module.scss";


export interface HomeIconProps {
  className:string;
  style?:CSSProperties;
  redirecting?:boolean;
  goto?:(str:string) => void;
  logo?:LogoKind;
  dest?:string;
}

const WINE_CODE = "wine";

export function GoHomeLogo(props:HomeIconProps) {
  let useHook = true;
  let dest    = props.dest ?? '/';

  if (props.redirecting === undefined && props.goto !== undefined || props.redirecting !== undefined && props.goto === undefined)
    throw new Error("Can't have one but now the other");
  else if (props.redirecting !== props.goto)
    useHook = false;

  const [redirecting, goto] = useHook ? useGoTo() : [props.redirecting!, props.goto!];

  const [code, setCode] = useState<string>('');
  const [beating, setBeating] = useState<boolean>(false);

  useEffect(() => {
    const listen = (e:KeyboardEvent) => {
      const full = code + e.key;
      if (WINE_CODE.substring(0, full.length) === full)
        setCode(c => c + e.key);
      else
        setCode('');
    };
    document.body.addEventListener('keypress', listen);

    if (code === WINE_CODE) {
      setCode('');
      setBeating(true);
      setTimeout(() => setBeating(false), 1000);
    }

    return () => document.body.removeEventListener('keypress', listen);
  }, [code]);

  return (
    <div
      id="home-page-button"
      className={`${styles.image} ${beating || redirecting ? styles.redirecting : ""} ${props.className}`}
      style={props.style}
      onClick={() => goto(dest, 'assign')}
    >
      <a href={dest} onClick={e => e.preventDefault()}>
        <Image
          alt={`${consts.name} logo; a purple heart suit with a golden spiky hexagram on top`}
          src={getLogo(props.logo ?? "brand-outline")}
          priority
        />
      </a>
    </div>
  );
}
