import { Metadata } from "next";
import Link from "next/link";

import consts from "@/utils/consts";
import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { getProfile } from "@/supabase/actions/user";
import { getUserDrafts } from "@/supabase/actions/post";

import { BackButton } from "../client";
import styles from "../styles.module.scss";

export const metadata:Metadata = {
  title: `Drafts • ${consts.name}`,
  description: "Oh hey! These are your drafts!",
};

export default async function DraftsPage() {
  const { data:profile } = await getProfile();
  const { data:drafts } = await getUserDrafts(profile?.username ?? "");

  if (!profile || !drafts)
    return; // not found

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <Header
        title="Drafts"
        left={<BackButton />}
      />
      <div className={styles.cardsHolder}>
        <div className={styles.cards}>
          {drafts.map(draft => (
            <Link href={`/compose?draft=${draft.id}`} id="wrapper" key={draft.id}>
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
