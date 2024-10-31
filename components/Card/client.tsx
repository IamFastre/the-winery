"use client";
import Link from "next/link";
import { IoScan } from "react-icons/io5";

import { CopyLinkButton } from "@/components/CopyLinkButton";
import { CardOptionsButton } from "@/components/CardOptionsButton";
import { focusable } from "@/utils/client";

import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";

export function CornerButtons({ id }:{ id:number; }) {
  return (
    <div className={styles.expand}>
      <Link
        type="wrapper"
        id="expand-post"
        href={`/c/${id}`}
        {...focusable(styles.active)}
      >
        <IoScan color={colors.accent} />
      </Link>
      <CopyLinkButton id={id} activeClassName={styles.active} />
      <CardOptionsButton id={id} activeClassName={styles.active} />
    </div>
  );
}
