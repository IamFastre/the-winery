"use client";
import { IoScan } from "react-icons/io5";

import { CopyLinkButton } from "@/components/CopyLinkButton";
import { focusable } from "@/utils";

import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";

export function CornerButtons({ id }:{ id:number; }) {
  return (
    <div className={styles.expand}>
      <a
        type="wrapper"
        id="expand-post"
        href={`/c/${id}`}
        {...focusable(styles.active)}
      >
        <IoScan color={colors.accent} />
      </a>
      <CopyLinkButton id={id} activeClassName={styles.active} />
    </div>
  );
}
