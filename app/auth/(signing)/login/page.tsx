import { Metadata } from "next";
import Link from "next/link";

import consts from "@/utils/consts";
import { Section } from "@/components/Section";

import { LoginCard } from "./client";
import styles from "../../styles.module.scss";

export const metadata:Metadata = {
  title: `Log in • ${consts.name}`,
  description: `Good to see you again! Log into your ${consts.shortname} account right here.`,
}

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <LoginCard />
        <Section isCard>
          <span className={styles.footer}>
            Don't have an account? <Link href="/auth/signup">sign up</Link> now!
          </span>
        </Section>
      </div>
    </div>
  );
}
