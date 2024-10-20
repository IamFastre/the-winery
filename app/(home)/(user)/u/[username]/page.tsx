import { Metadata } from "next";
import Image from "next/image";

import consts from "@/utils/consts";
import { getUserPosts } from "@/utils/api/user/posts";
import { getUserInfo } from "@/utils/api/user/info";
import { Section } from "@/components/Section";
import { addLogoBadge } from "@/utils/server";

import { CardList, ProfileInfo } from "./server";
import { DataBox, ProfileEditor } from "./client";
import styles from "./styles.module.scss";


interface UserPageProps {
  params: { username: string }
}

export async function generateMetadata({ params }:UserPageProps) : Promise<Metadata> {
  const username = params.username;
  const { data:profile } = await getUserInfo('identifier', params.username);
  
  if (profile) {
    const profileWithBadge = await addLogoBadge(profile.avatar);
    return {
      title: `u:${username} • ${consts.name}`,
      description: `${username}'s profile page.`,
      icons: {
        icon: profileWithBadge!,
        apple: profileWithBadge!,
      },
    };
  } else {
    return {
      title: `Not Found • ${consts.name}`,
      description: `Requested user '${username}', was not found.`,
    };
  }
}

export default async function UserPage({ params }:UserPageProps) {
  const self = (await getUserInfo('self', '')).data;

  if (!self)
    return;

  const isSelf  = self.identifier === params.username.toLowerCase();
  const other = !isSelf ? (await getUserInfo('identifier', params.username)).data : null;
  const profile = isSelf ? self : other;
  const posts = profile ? (await getUserPosts('author_uuid', profile.id)).data : null;

  if (!profile || !posts)
    return; // not found

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <Image
        src={profile.avatar}
        alt={''}
        width={256}
        height={256}
        className={styles.avatarBlur}
      />
      <div className={styles.userBox}>
        { isSelf ? <ProfileEditor profile={self} /> : <ProfileInfo profile={profile} isConfirmed={profile.mail_confirmed} /> }
        <DataBox cards={posts.length} joined={profile.created_at} />
      </div>
      <hr/>
      <CardList posts={posts} />
    </Section>
  );
}
