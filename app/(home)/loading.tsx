import { Section } from "@/components/Section";

import styles from "./page.module.scss";

export default function Loading() {
  return (
    <Section style={{ flex: 1 }} containerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <span  className={styles.loading}>
        <span>
          Loading
        </span>
        <span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </span>
    </Section>
  );
}
