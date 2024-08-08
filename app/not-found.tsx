import { Metadata } from "next";
import { IoHome } from "react-icons/io5";

import consts from "@/utils/consts";
import { Section } from "@/components/Section";
import { RI, C } from "@/components/C";

import styles from './not-found.module.scss';

export const metadata:Metadata = {
  title: `404 • ${consts.name}`,
  description: "No such page was found.",
}

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
