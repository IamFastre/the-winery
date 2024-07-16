"use client";
import { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { focusable } from "@/utils";
import { getPosts, getUserByIdentifier } from "@/utils/server";
import { Section, Card, C } from "@/components";

import styles from "./page.module.scss";


export default function HomePage() {
  const [cache, setCache] = useState<{ posts:any[], users:any[] } | null>(null);
  const [index, setIndex] = useState<number>(0);

  const [error, setError] = useState<boolean>(false);

  const inc = (num:number = 1) => {
    if (cache)
      if (index + num < cache.posts.length && index + num >= 0)
        setIndex(index + num);
  };

  useEffect(() => {
    const start = async () => {
      const { data: posts, error: postsError } = await getPosts(20);
      const users = (await Promise.all(posts?.map(post => getUserByIdentifier(post.author!))!)).map(u => u.data);

      if (postsError || posts.length <= 0)
        setError(true)

      if (posts && posts.length > 0 && users.length > 0) {
        setCache({ ...cache, posts, users });
        setError(false)
      }
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
        cache && cache?.posts[index] && cache.users[index] ?
        <>
          <Card
            username={cache.users[index].username}
            displayName={cache.users[index].display_name}
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
