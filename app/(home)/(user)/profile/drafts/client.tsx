"use client";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

import { focusable } from "@/utils";

import styles from "./styles.module.scss";

export function BackButton() {
  const router = useRouter();
 
  return (
    <div className={styles.backButton} {...focusable(styles.active, router.back)}>
      <IoChevronBack />
    </div>
  ); 
}