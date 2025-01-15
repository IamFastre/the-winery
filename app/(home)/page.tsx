import { Section } from "@/components/Section";
import { ThemeWallpaper } from "@/components/ThemeWallpaper";

import { FeedNavigator } from "./client";
import styles from "./page.module.scss";


export default async function HomePage() {
  return (
    <Section title="Home" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      <ThemeWallpaper />
      <FeedNavigator />
    </Section>
  );
}
