import { PageSection } from "@/components/Section";

import { FeedNavigator } from "./client";
import styles from "./page.module.scss";


export default async function HomePage() {
  return (
    <PageSection title="Home" containerClassName={styles.sectionContent}>
      <FeedNavigator />
    </PageSection>
  );
}
