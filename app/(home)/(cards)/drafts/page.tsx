import { Metadata } from "next";
import { IoFolder } from "@icons/io5/IoFolder";

import consts from "@/utils/consts";
import { getUserDrafts } from "@/utils/api/user/drafts";
import { PageSection } from "@/components/Section";
import { Header } from "@/components/Header";
import { ErrorPage } from "@/components/Pages";

import { PageIcon } from "../server";
import { BackButton } from "../client";
import styles from "../styles.module.scss";
import { CardList } from "@/components/CardList";

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
    <PageSection className={styles.section} containerClassName={styles.sectionContainer}>
      <Header
        title="Drafts"
        subtitle={`${count} ${(count ?? drafts.length) > 1 ? "cards" : "card"}`}
        left={<BackButton />}
        right={<PageIcon icon={IoFolder} />}
      />
      <CardList cards={drafts} type="drafts" />
    </PageSection>
  );
}
