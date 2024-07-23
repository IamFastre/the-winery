import { IoFolderOpenOutline } from "react-icons/io5";

import { Post } from "@/supabase/actions/types";
import { Card } from "@/components/Card";

import styles from "./styles.module.scss";

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