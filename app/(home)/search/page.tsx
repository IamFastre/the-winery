import { Metadata } from "next";

import consts from "@/utils/consts";
import { Section } from "@/components/Section";

import { Searcher } from "./client";
import styles from "./styles.module.scss";

export const metadata:Metadata = {
  title: `Search • ${consts.name}`,
  description: `Look up any ${consts.shortname} user by either username or display name.`,
}

export default async function SearchPage() {
  return (
    <Section title="Search" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      <Searcher />
    </Section>
  );
}
