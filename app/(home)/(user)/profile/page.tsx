import { Metadata } from "next";

import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { getUserPosts } from "@/supabase/actions/post";
import { getProfile } from "@/supabase/actions/user";
import { DataBox } from "@/components/DataBox";
import { humanizeTime } from "@/utils";

import { ProfileInfo } from "./client";
import styles from "../styles.module.scss";

export const metadata:Metadata = {
  title: "My Profile • The Winery",
  description: "Edit your profile.",
};

export default async function UserPage() {
  const { data:profile } = await getProfile();
  const { data:posts } = await getUserPosts(profile?.username ?? "");

  if (!profile || !posts)
    return;

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <div className={styles.userBox}>
        <ProfileInfo profile={profile} />
        <DataBox data={{ cards: posts.length, joined: humanizeTime(profile.created_at, true) }} />
      </div>
      <hr/>
      <div className={styles.cardsHolder}>
        <div className={styles.cards}>
          {posts.map(post => (
            <Card
              title={post.title}
              content={post.content}
              timestamp={post.timestamp}
              key={post.id}
              centered
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
