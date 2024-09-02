"use client";
import { IoScan } from "react-icons/io5";
import { focusable } from "@/utils";

import styles from "./style.module.scss";

export function ExpandButton({ id }:{ id:number; }) {
  return (
    <a
      id="wrapper"
      className={styles.expand}
      href={`/c/${id}`}
      {...focusable(styles.active)}
    >
      <IoScan />
    </a>
  );
}
