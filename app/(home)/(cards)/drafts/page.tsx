import { Metadata } from "next";
import { IoFolder } from "react-icons/io5";
import Link from "next/link";

import consts from "@/utils/consts";
import { getUserDrafts } from "@/utils/api/user/drafts";
import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { ErrorPage } from "@/components/Pages";

import { PageIcon } from "../server";
import { BackButton } from "../client";
import styles from "../styles.module.scss";

export const metadata:Metadata = {
  title: `Drafts • ${consts.name}`,
  description: "Oh hey! These are your drafts!",
};

export default async function DraftsPage() {
  const { data, error } = await getUserDrafts();

  if (error)
    return (
      <ErrorPage
        message={error?.message}
        code={error?.code}
        type="PG"
      />
    );

  const { drafts, count } = data;

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <Header
        title="Drafts"
        subtitle={`${count} ${(count ?? drafts.length) > 1 ? "cards" : "card"}`}
        left={<BackButton />}
        right={<PageIcon icon={IoFolder} />}
      />
      <div className={styles.cardsHolder}>
        <div className={styles.cards}>
          {drafts.map(draft => (
            <Link href={`/compose?draft=${draft.id}`} type="wrapper" key={draft.id}>
              <Card
                title={draft.title}
                content={draft.content}
                timestamp={draft.timestamp}
                centered
              />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
