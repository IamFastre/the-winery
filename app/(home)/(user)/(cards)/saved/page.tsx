import { Metadata } from "next";
import Link from "next/link";

import consts from "@/utils/consts";
import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { getAuthorsMap, getProfile } from "@/supabase/actions/user";
import { getUserSaved } from "@/supabase/actions/post";

import { BackButton } from "../client";
import styles from "../styles.module.scss";

export const metadata:Metadata = {
  title: `Saved • ${consts.name}`,
  description: "Oh hey! These are your saved posts!",
};

export default async function SavesPage() {
  const { data:profile } = await getProfile();
  const { data:posts } = await getUserSaved(profile?.identifier ?? "");
  const { data:users } = await getAuthorsMap(posts?.map(p => p.author!)!);

  if (!profile || !posts || !users)
    return; // not found

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <Header
        title="Saved"
        left={<BackButton />}
      />
      <div className={styles.cardsHolder}>
        <div className={styles.cards}>
          {posts.map(post => (
            <div>
              <Card
                username={users[post.author!].username}
                userAvatar={users[post.author!].avatar}
                title={post.title}
                content={post.content}
                timestamp={post.timestamp}
                postId={post.id}
                centered
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
