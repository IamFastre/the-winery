import { Section } from "@/components/Section";

import { FeedNavigator } from "./client";
import styles from "./page.module.scss";


export default async function HomePage() {
  return (
    <Section title="Home" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      <FeedNavigator />
    </Section>
  );
}
