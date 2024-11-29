"use client";
import { useRouter } from "next/navigation";

import { IoChevronBack } from "@react-icons/all-files/io5/IoChevronBack";
import { IoClose } from "@react-icons/all-files/io5/IoClose";

import { focusable, routerCanGoBack } from "@/utils/client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export function BackButton() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState<boolean>();

  useEffect(() => {
    setCanGoBack(routerCanGoBack());
  }, [])

  const func = () => {
    if (canGoBack)
      router.back();
    else
      router.push('/');
  }

  if (typeof canGoBack === 'undefined')
    return null;

  return (
    <div className={styles.backButton} {...focusable(styles.active, func)}>
      {
        canGoBack
        ? <IoChevronBack />
        : <IoClose />
      }
    </div>
  ); 
}
