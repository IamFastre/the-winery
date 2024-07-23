import { Metadata } from "next";

import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { getUserPosts } from "@/supabase/actions/post";
import { getProfile } from "@/supabase/actions/user";

import { CardList } from "../server";
import { DataBox } from "../client";
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
        <DataBox cards={posts.length} joined={profile.created_at} />
      </div>
      <hr/>
      <CardList posts={posts} />
    </Section>
  );
}
