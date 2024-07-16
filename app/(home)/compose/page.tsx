"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoAdd, IoEye, IoEyeOutline, IoFolderOutline } from "react-icons/io5";

import { createDraft, createPost, getUser } from "@/utils/server";
import { Button, C, MarkDown, Section } from "@/components";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";


export default function ComposePage() {
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const placeholder = "Change title";
  const input = (
    <input
      type="text"
      name="span"
      placeholder={placeholder}
      value={title}
      onChange={e => setTitle(e.target.value)}
      onBlur={() => setTitle(t => t.trim())}
      style={{ width: title ? title.length * 13 : placeholder.length * 13 }}
      autoComplete="off"
    />
  );

  useEffect(() => {
    const start = async () => {
      const { data, error } = await getUser();
      if (data && !error) {
        setUsername(data.username);
        setError(false);
      }
      else
        setError(true);
    };
    start();
  }, []);

  const onPost = async () => {
    const { error } = await createPost(title, content);
    setError(!!error);
    console.log(error);
    if (!error)
      router.push('/');
  };

  const onDraft = async () => {
    const { error } = await createDraft(title, content);
    setError(!!error);
    console.log(error);
    if (!error)
      router.push('/profile');
  };

  return (
    <Section title="Compose" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      <div className={styles.title}>
        <span>
          Create Card
        </span>
        <hr />
      </div>
      <div className={styles.post}>
        <Section
          title={input}
          className={styles.card}
          containerClassName={styles.cardContent}
          isCard
        >
          {
            showPrev ?
            <MarkDown>
              {/* TODO: replace the link with an internal `/help/markdown` one */}
              {content ? content : "### *Input Preview*\n*Try actually doing some [basic markdown](https://www.markdownguide.org/cheat-sheet/#basic-syntax), and some [extended syntax](https://www.markdownguide.org/cheat-sheet/#basic-syntax).*"}
            </MarkDown>
            :
            <textarea
              name="span"
              placeholder="What's on your mind?"
              value={content}
              onChange={e => setContent(e.target.value)}
              onBlur={() => setContent(c => c.trim())}
              autoComplete="off"
            />
          }
          <Button
            noMinimum
            iconBackground
            className={styles.showPrev}
            onClick={() => setShowPrev(!showPrev)}
            color={colors.highlight}
            icon={{ element: showPrev ? IoEyeOutline : IoEye, }}
          />
        </Section>
        <div className={styles.footer}>
          <span>
            <C.SECONDARY>
              Posting as
            </C.SECONDARY>
            <C.QUINARY>
              {' u:'}
            </C.QUINARY>
            <C.ACCENT>
              {username ?? "<self>"}
            </C.ACCENT>
          </span>
          <div className={styles.actions}>
            <Button
              noMinimum
              icon={{ element: IoFolderOutline }}
              onClick={onDraft}
              disabled={!username}
            />
            <Button
              title="Post"
              icon={{ element: IoAdd }}
              onClick={onPost}
              disabled={!username}
            />
          </div>
        </div>
        {
          error
          ?
          <span className={styles.error}>
            Oops...
            <br/>
            <span>
              Seems an error has occurred, try again in a bit.
            </span>
          </span>
          : null
        }
      </div>
    </Section>
  );
}
