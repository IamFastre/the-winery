import Image from "next/image";

import { IoFolderOpenOutline, IoHelpCircle } from "react-icons/io5";

import { UserInfo } from "@/utils/api/user/info";
import { CardPost } from "@/utils/api/card/post";
import { Card } from "@/components/Card";
import { C } from "@/components/C";
import { Bio } from "@/components/Bio";

import styles from "./styles.module.scss";

export function ProfileInfo({ profile }:{ profile:UserInfo }) {
  return (
    <>
      <Image
        alt={`${profile.username}'s profile picture.`}
        src={profile.avatar}
        width={128}
        height={128}
        className={styles.avatar}
      />
      <ProfileTextStuff profile={profile} />
    </>
  );
}

export function ProfileTextStuff({ profile }:{ profile:UserInfo }) {
  return (
    <div className={styles.textStuff}>
      <div className={styles.names}>
        <span>
          {profile.display_name ?? profile.username}
        </span>
        <span>
          <C.QUINARY>
            u:
          </C.QUINARY>
          <C.ACCENT>
            {profile.username}
          </C.ACCENT>
        </span>
        {profile.mail_confirmed || <IoHelpCircle title="Email not confirmed." />}
      </div>
      <Bio info={profile} />
    </div>
  );
}

export function CardList({ posts }:{ posts:CardPost[] }) {
  return (
    <div className={styles.cardsHolder}>
      {
        posts.length ?
        <div className={styles.cards}>
          { posts.map(post => (
            <Card
              title={post.title}
              content={post.content}
              timestamp={post.timestamp}
              postId={post.id}
              key={post.id}
              centered
            />
            )) }
        </div>
      :
      <div className={styles.noCards}>
        <IoFolderOpenOutline />
        <span>
          No posts yet
        </span>
      </div>
      }
    </div>
  );
}
