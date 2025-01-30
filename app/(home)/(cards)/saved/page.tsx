import { Metadata } from "next";
import { IoBookmark } from "@icons/io5/IoBookmark";

import consts from "@/utils/consts";
import { getUserSaves } from "@/utils/api/user/saves";
import { PageSection } from "@/components/Section";
import { Header } from "@/components/Header";
import { ErrorPage } from "@/components/Pages";
import { CardList } from "@/components/CardList";

import { PageIcon } from "../server";
import { BackButton } from "../client";
import styles from "../styles.module.scss";

export const metadata:Metadata = {
  title: `Saved • ${consts.name}`,
  description: "Oh hey! These are your saved posts!",
};

export default async function SavesPage() {
  const { data, error } = await getUserSaves();

  if (error)
    return (
      <ErrorPage
        message={error?.message}
        code={error?.code}
        type="PG"
      />
    );

  const { saves, users, count } = data;

  return (
    <PageSection className={styles.section} containerClassName={styles.sectionContainer}>
      <Header
        title="Saved"
        subtitle={`${count} ${count > 1 ? "cards" : "card"}`}
        left={<BackButton />}
        right={<PageIcon icon={IoBookmark} />}
      />
      <CardList cards={saves} users={users} type="posts" />
    </PageSection>
  );
}
