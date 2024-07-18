"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoEyeOutline, IoEye, IoFolderOutline, IoAdd } from "react-icons/io5";

import { createPost, createDraft } from "@/utils/server";
import { Section, MarkDown, Button, C } from "@/components";
import { Database } from "@/supabase/types";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";
import XRegExp from "xregexp";

export function PostEditor({ user, error: userError }:{ user:Database['public']['Tables']['users']['Row']; error:boolean; }) {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(userError);

  const placeholder = "Change title";
  const input = (
    <input
      type="text"
      name="span"
      placeholder={placeholder}
      value={title}
      onChange={e => setTitle(e.target.value)}
      onBlur={() => setTitle(t => t.trim())}
      style={{ width: title ? title.length * 11.72 : placeholder.length * 11.72 }}
      autoComplete="off"
    />
  );

  const onPost = async () => {
    const { error: postError } = await createPost(title, content);
    setError(!!postError);

    if (!postError)
      router.push('/');
  };

  const onDraft = async () => {
    const { error: draftError } = await createDraft(title, content);
    setError(!!draftError);

    if (!draftError)
      router.push('/profile');
  };

  return (
    <div className={styles.post}>
      <Section
        title={showPrev ? title : input}
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
            placeholder="What's on your mind? (min. 16)"
            value={content}
            onChange={e => { setContent(e.target.value); setError(false); }}
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
        <div className={styles.asUser}>
          <span>
            <C.SECONDARY>
              Posting as
            </C.SECONDARY>
            <C.QUINARY>
              {' u:'}
            </C.QUINARY>
            <C.ACCENT>
              {user.username ?? "<self>"}
            </C.ACCENT>
          </span>
        </div>
        <div className={styles.actions}>
          <Button
            noMinimum
            icon={{ element: IoFolderOutline }}
            onClick={onDraft}
            disabled={!user.username}
          />
          <Button
            noMinimum
            title="Post"
            icon={{ element: IoAdd }}
            onClick={onPost}
            disabled={!user.username}
          />
        </div>
      </div>
      {
        error
        ?
        <span className={styles.error}>
          Oops...
          <br/>
          {
            // TODO: Make that ignore MD somehow
            content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length < 16 ?
            <>
              <span>
                That's a really short thought don't you think?
              </span>
            </>
            :
            <>
              <span>
                Seems an error has occurred, try again?
              </span>
              <br/>
              <span>
                if that didn't work <a href="https://github.com/IamFastre/the-winery/issues">fill a Github issue</a>.
              </span>
            </>
          }
        </span>
        : null
      }
    </div>
  );
}