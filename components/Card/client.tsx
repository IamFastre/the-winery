"use client";
import Link from "next/link";
import { IoScan } from "@icons/io5/IoScan";

import { focusable } from "@/utils/client";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { CardOptionsButton } from "@/components/CardOptionsButton";

import colors from "@/styles/colors.js";
import styles from "./style.module.scss";

export function CornerButtons({ id, postTitle, postContent }:{ id:number; postTitle:string | null; postContent:string; }) {
  return (
    <div className={styles.cornerButtons}>
      <Link
        type="wrapper"
        id="expand-post"
        href={`/c/${id}`}
        {...focusable(styles.active)}
      >
        <IoScan color={colors.accent} />
      </Link>
      <CopyLinkButton id={id} activeClassName={styles.active} />
      <CardOptionsButton id={id} activeClassName={styles.active} postTitle={postTitle} postContent={postContent} />
    </div>
  );
}
