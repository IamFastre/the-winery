"use client";
import { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { Section, Card } from "@/components";
import { focusable } from "@/utils";

import styles from "./page.module.scss";

// to be replaced of course
import data from "@/mock/data.json";

export default function HomePage() {
  const [index, setIndex] = useState<number>(0);
  const post = data[index];

  const inc = (num:number = 1) => {
    if (index + num < data.length && index + num >= 0)
      setIndex(index + num);
  }

  useEffect(() => {
    if (index >= data.length)
      setIndex(data.length-1);
    if (index < 0)
      setIndex(0);
  }, [index])

  return (
    <Section title="Home" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      <Card
        username="IamFastre"
        userAvatar="https://avatars.githubusercontent.com/u/61952761?v=4"
        title={post.title}
        content={post.content}
        timestamp={post.timestamp}
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
          className={index >= data.length-1 ? styles.disabled : null}
          {...focusable(styles.active, () => inc(+1)) as any}
        />
      </div>      
    </Section>
  );
}
