import { Section } from "@/components/Section";

import { Searcher } from "./client";
import styles from "./styles.module.scss";


export default async function SearchPage() {
  return (
    <Section title="Search" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      <Searcher />
    </Section>
  );
}
