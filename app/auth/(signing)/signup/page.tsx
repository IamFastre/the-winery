import { Metadata } from "next";

import consts from "@/utils/consts";
import { Section } from "@/components/Section";

import { SignupCard } from "./client";
import styles from "../../styles.module.scss";

export const metadata:Metadata = {
  title: `Sign up • ${consts.name}`,
  description: `You found ${consts.name}! Don't waste any more time, create a new ${consts.shortname} account now!`,
}

export default function SignupPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SignupCard />
        <Section isCard>
          <span className={styles.footer}>
            Already have an account? <a href="/auth/login">log in</a> now!
          </span>
        </Section>
      </div>
    </div>
  );
}
