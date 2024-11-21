"use client";
import { useState } from "react";
import { focusable } from "@/utils/client";

import styles from "./style.module.scss";

export function BioText({ content }:{ content:string }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <span
      className={`${styles.bioText} ${expanded ? styles.expanded : ""}`}
      {...focusable("", () => setExpanded(e => !e))}
    >
      {content}
    </span>
  );
}