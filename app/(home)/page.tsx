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
        title="Card Demo"
        content={"This is the body of a card and it has this content, blah blah blah. I like coffee but it don't like me back; I think 'cause I consume it, I don't know. I *hate* Taylor Swift, Java and children.\\\nMore blah blah blahs but on a new line. Oh look a footnote label thing!![^1]\n\nAnd this is a totally new paragraph. You can tell by the spacing above!\n\n---\nThis ^ thing is a separator line (otherwise called thematic breaker/horizontal rule)\n\nthis is **bold**\\\nthis is _italic_\\\nthis is ***bold italic***\\\nthis is ~~strike through~~\\\nthis is ^superscript^\\\nthis is ~subscript~\\\nthis is a [hyperlink](https://youtu.be/dQw4w9WgXcQ)\\\nthis is a [heading link](#heading-1)\n\n> this is a quote\n>\n> with 2 or more lines\n\nthat's code: `print(\"hello, world\")`\n\nthis is an unordered list:\n- hi\n- I'm unordered\n\nthis is an ordered list:\n1. hi\n1. I'm ordered\n\nthis is a task list:\n- [ ] hi\n- [x] I'm a done task\n\n*![logo](/static/images/logo/NaipeDeCopasMono.png)*\\\nthat was a small image\n\n![logo](/static/images/logo/NaipeDeCopasMono.png)\\\nthat was a medium image\n\n**![logo](/static/images/logo/NaipeDeCopasMono.png)**\\\nthat was a big image\n\nthese are headings\n\n# Heading 1\n\n## Heading 2\n\n### Heading 3\n\n#### Heading 4\n\n##### Heading 5\n\n###### Heading 6\n\nthis is a table\n| Left | Centered | Right |\n| :- | :-: | -: |\n| a | b | 1 |\n| c | d | 2 |\n[^1]: Hey, I'm the footnote."}
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
