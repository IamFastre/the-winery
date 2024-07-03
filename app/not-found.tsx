"use client";
import { RI, C, Section } from "@/components";
import styles from './not-found.module.scss';
import { IoHome } from "react-icons/io5";

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
