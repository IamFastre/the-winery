"use client";
import { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { PostgrestError } from "@supabase/supabase-js";

import { Section, Card, C } from "@/components";
import { focusable } from "@/utils";
import { getPosts, getUser } from "@/utils/server";

import styles from "./page.module.scss";


export default function HomePage() {
  const [cache, setCache] = useState<{ posts:any[], users:any[] } | null>(null);
  const [index, setIndex] = useState<number>(0);

  const [error, setError] = useState<PostgrestError | null>(null);

  const inc = (num:number = 1) => {
    if (cache)
      if (index + num < cache.posts.length && index + num >= 0)
        setIndex(index + num);
  };

  useEffect(() => {
    const start = async () => {
      const { data: posts, error: postsError } = await getPosts(20);
      const users = (await Promise.all(posts?.map(post => getUser(post.author!))!)).map(u => u.data);

      if (postsError)
        setError(error)
      if (posts)
        setCache({ ...cache, posts, users });
    };
    start();
  }, []);

  useEffect(() => {
    if (cache) {
      if (index >= cache.posts.length)
        setIndex(cache.posts.length - 1);
      if (index < 0)
        setIndex(0);
    }
  }, [index]);

  return (
    <Section title="Home" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      {
        cache ?
        <>
          <Card
            username={cache.users[index].username}
            userAvatar={cache.users[index].avatar}
            title={cache.posts[index].title}
            content={cache.posts[index].content}
            timestamp={cache.posts[index].timestamp}
            className={styles.card}
          />

          <div className={styles.quiver}>
            <IoArrowBack
              className={index <= 0 ? styles.disabled : null}
              {...focusable(styles.active, () => inc(-1)) as any}
            />
            <span>
              {index+1}
            </span>
            <IoArrowForward
              className={index >= cache.posts.length-1 ? styles.disabled : null}
              {...focusable(styles.active, () => inc(+1)) as any}
            />
          </div>      
        </>
        : error ?
        <>
          <div className={styles.error}>
            <C.TERTIARY>
              Uh-oh...
            </C.TERTIARY>
            <C.SECONDARY>
              An <C.RED>error</C.RED> has occurred loading home page.
            </C.SECONDARY>
            <C.SECONDARY>
              try <a href="/">refreshing</a>?
            </C.SECONDARY>
          </div>
        </>        :
        <>
          <span>
            <C.ACCENT>
              Loading
            </C.ACCENT>
            <C.SECONDARY>
              ...
            </C.SECONDARY>
          </span>
        </>
      }
    </Section>
  );
}
