import { Metadata } from "next";

import consts from "@/utils/consts";

import { ResetCard } from "./client";
import styles from "../../styles.module.scss";

export const metadata:Metadata = {
  title: `Reset Password • ${consts.name}`,
  description: `Here to provide your new password`,
}

export default function RestPasswordPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ResetCard />
      </div>
    </div>
  );
}
