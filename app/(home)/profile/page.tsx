import { Metadata } from "next";

import { B, C } from "@/components/C";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { getUserPosts } from "@/supabase/actions/post";
import { getProfile } from "@/supabase/actions/user";

import { ProfileInfo } from "./client";
import styles from "./styles.module.scss";

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
        <div className={styles.dataBox}>
          <div className={styles.data}>
            <span className={styles.dataItem}>
              <C.QUINARY>
                {posts.length >= 2 ? "cards" : "card"}
              </C.QUINARY>
              {': '}
              <B>
                {posts.length}
              </B>
            </span>
          </div>
        </div>
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
