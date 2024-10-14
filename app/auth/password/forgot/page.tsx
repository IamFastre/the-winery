import { Metadata } from "next";

import consts from "@/utils/consts";

import { ForgotCard } from "./client";
import styles from "../../styles.module.scss";

export const metadata:Metadata = {
  title: `Forgot Password • ${consts.name}`,
  description: `Someone is an idiot, here is to retrogress your idiocrasy and reset your password! And please use a password manager...`,
}

export default function ForgotPasswordPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ForgotCard />
      </div>
    </div>
  );
}
