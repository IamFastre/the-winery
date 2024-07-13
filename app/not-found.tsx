import { IoHome } from "react-icons/io5";

import { Section } from "@/components/Section";
import { RI, C } from "@/components/C";

import styles from './not-found.module.scss';


export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <Section title="Oops..." className={styles.section} containerClassName={styles.sectionContent} centered>
        <span>
          <C.TERTIARY>404</C.TERTIARY>
          <C.SECONDARY> | </C.SECONDARY>
          <RI><C.HOT>This page was not found</C.HOT></RI>
        </span>
        <a href="/">
          <IoHome />
        </a>
      </Section>
    </div>
  );
}
