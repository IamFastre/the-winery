import { Metadata } from "next";
import Link from "next/link";

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
    <>
      <SignupCard />
      <Section isCard>
        <span className={styles.footer}>
          Already have an account? <Link href="/auth/login">log in</Link> now!
        </span>
      </Section>
    </>
  );
}
