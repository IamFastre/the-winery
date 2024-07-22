"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoEyeOutline, IoEye, IoFolderOutline, IoAdd, IoWine, IoFolder } from "react-icons/io5";
import XRegExp from "xregexp";

import { createPost, createDraft } from "@/supabase/actions/post";
import { type AuthError, PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/supabase/types";
import { Section, MarkDown, Button, C } from "@/components";
import { useToaster } from "@/providers/Toaster";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";

export function PostEditor({ user, error: userError }:{ user:Database['public']['Tables']['profiles']['Row']; error:AuthError | PostgrestError | null; }) {
  const router = useRouter();
  const toaster = useToaster();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [error, setError] = useState<AuthError | PostgrestError | null>();

  const placeholder = "Change title";
  const input = (
    <input
      type="text"
      name="span"
      placeholder={placeholder}
      value={title}
      onChange={e => setTitle(e.target.value)}
      onBlur={() => setTitle(t => t.trim())}
      style={{ width: (title ? title.length : placeholder.length) * 11.72 }}
      autoComplete="off"
    />
  );

  const isOK = content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length >= 16;

  const onPost = async () => {
    const { error: postError } = await createPost(title, content);
    setError(postError as any);

    if (!postError) {
      toaster.add({ message: "Post added", icon: IoWine });
      router.push('/profile');
    }
  };

  const onDraft = async () => {
    const { error: draftError } = await createDraft(title, content);
    setError(draftError as any);

    if (!draftError) {
      toaster.add({ message: "Draft added", icon: IoFolder });
      router.push('/profile/drafts');
    }
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
            onChange={e => { setContent(e.target.value); setError(null); }}
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
              {user.username}
            </C.ACCENT>
          </span>
        </div>
        <div className={styles.actions}>
          <Button
            noMinimum
            icon={{ element: IoFolderOutline }}
            onClick={onDraft}
            disabled={!(isOK && user.username)}
          />
          <Button
            noMinimum
            title="Post"
            icon={{ element: IoAdd }}
            onClick={onPost}
            disabled={!(isOK && user.username)}
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
            !isOK ?
            <>
              <span>
                That's a really short thought, don't you think?
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
                {
                  Object.keys(error).length ?
                  <>
                    <br/>
                    {JSON.stringify(error)}
                  </>
                  : null
                }
              </span>
            </>
          }
        </span>
        : null
      }
    </div>
  );
}
