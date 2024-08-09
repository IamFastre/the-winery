import Image from "next/image";

import { IoFolderOpenOutline } from "react-icons/io5";
import { PublicProfile } from "@/supabase/actions/types";

import { Post } from "@/supabase/actions/types";
import { Card } from "@/components/Card";
import { C } from "@/components/C";
import { Bio } from "@/components/Bio";

import styles from "./styles.module.scss";

export function ProfileInfo({ profile }:{ profile:PublicProfile; }) {
  return (
    <>
      <Image
        alt={`${profile.username}'s profile picture.`}
        src={profile.avatar}
        width={128}
        height={128}
        className={styles.avatar}
      />
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
        </div>
        <Bio content={profile.bio} />
      </div>
    </>
  );
}

export function CardList({ posts }:{ posts:Post[] }) {
  return (
    <div className={styles.cardsHolder}>
      {
        posts.length ?
        <div className={styles.cards}>
          { posts.map(post => (
            <Card title={post.title} content={post.content} timestamp={post.timestamp} key={post.id} centered />)) }
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
