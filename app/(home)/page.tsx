"use client";
import { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { Section, Card } from "@/components";
import { focusable } from "@/utils";

import styles from "./page.module.scss";


export default function HomePage() {
  const [index, setIndex] = useState<number>(0);
  // pseudo length value
  const length = 10;

  const inc = (num:number = 1) => {
    if (index + num < length && index + num >= 0)
      setIndex(index + num);
  }

  useEffect(() => {
    if (index >= length)
      setIndex(length-1);
    if (index < 0)
      setIndex(0);
  }, [index])

  return (
    <Section title="Home" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      <Card
        username="IamFastre"
        userAvatar="https://avatars.githubusercontent.com/u/61952761?v=4"
        title="Card Title"
        // content="asd"
        content={"This is the body of a card and it has this content, blah blah blah. I like coffee but it don't like me back; I think 'cause I consume it, I don't know. I *hate* Taylor Swift, Java and children.\\\nMore blah blah blahs but on a new line.\n\nAnd this is a totally new paragraph. You can tell by the spacing above!\n\n---\nThis ^ thing is a separator line (otherwise called thematic breaker/horizontal rule)\n\nthis is **bold**\\\nthis is _italic_\\\nthis is ***bold italic***\n\n# Header 1\nbody\n\n## Header 2\n\n### Header 3\n\n#### Header 4\n\n##### Header 5\n\n###### Header 6"}
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
          className={index >= length-1 ? styles.disabled : null}
          {...focusable(styles.active, () => inc(+1)) as any}
        />
      </div>      
    </Section>
  );
}
