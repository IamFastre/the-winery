'use client';
import { useState } from "react";

import { focusable } from "@/utils";
import styles from "./style.module.scss";

export function Bio(props:{ content:string; }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={`${styles.bio} ${expanded ? styles.expanded : ""}`}
      {...focusable("", () => setExpanded(e => !e))}
    >
      <span>
        {props.content}
      </span>
    </div>
  );
}
