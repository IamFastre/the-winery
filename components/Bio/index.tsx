'use client';
import { useState } from "react";

import { focusable } from "@/utils";
import styles from "./style.module.scss";

export function Bio(props:{ content:string; }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className={`${styles.bio} ${expanded ? styles.expanded : ""}`}>
      <span {...focusable("", () => setExpanded(e => !e))}>
        {props.content}
      </span>
    </div>
  );
}
