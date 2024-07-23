"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { IoEyeOutline, IoEye, IoFolderOutline, IoAdd, IoWine, IoFolder } from "react-icons/io5";
import XRegExp from "xregexp";

import { createPost, createDraft, editDraft, deleteDraft } from "@/supabase/actions/post";
import { type AuthError, PostgrestError } from "@supabase/supabase-js";
import { Draft, Profile } from "@/supabase/actions/types";
import { Section, MarkDown, Button, C } from "@/components";
import { useToaster } from "@/providers/Toaster";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";
import { RiBallPenLine, RiDeleteBin6Line } from "react-icons/ri";

type State<T> = Dispatch<SetStateAction<T>>;

const Editor = (props:{ title:string; content:string; show:boolean; setShow:State<boolean>; setTitle:State<string>; setContent:State<string>; setError: State<null>; }) => (
  <Section
    title={props.show ?
      props.title :
      <input
        type="text"
        name="span"
        placeholder="Change title"
        value={props.title}
        onChange={e => props.setTitle(e.target.value)}
        onBlur={() => props.setTitle(t => t.trim())}
        style={{ width: (props.title ? props.title.length : 12) * 11.72 }}
        autoComplete="off"
        />
      }
    className={styles.card}
    containerClassName={styles.cardContent}
    isCard
  >
    {
      props.show ?
      <MarkDown>
      {/* TODO: replace the link with an internal `/help/markdown` one */}
      { props.content ? props.content : "### *Input Preview*\n*Try actually doing some [basic markdown](https://www.markdownguide.org/cheat-sheet/#basic-syntax), and some [extended syntax](https://www.markdownguide.org/cheat-sheet/#basic-syntax).*"}
    </MarkDown>
      :
      <textarea
        name="span"
        placeholder="What's on your mind? (min. 8)"
        value={props.content}
        onChange={e => { props.setContent(e.target.value); props.setError(null); }}
        onBlur={() => props.setContent(c => c.trim())}
        autoComplete="off"
      />
    }
    <Button
      noMinimum
      iconBackground
      className={styles.showPrev}
      onClick={() => props.setShow(!props.show)}
      color={colors.highlight}
      icon={{ element: props.show ? IoEyeOutline : IoEye }}
    />
  </Section>
);

const AsUser = ({ username }:{ username:string; }) => (
  <div className={styles.asUser}>
    <span>
      <C.SECONDARY>
        Posting as
      </C.SECONDARY>
      <C.QUINARY>
        {' u:'}
      </C.QUINARY>
      <C.ACCENT>
        {username}
      </C.ACCENT>
    </span>
  </div>
);

const Error = (props:{ error:AuthError | PostgrestError; isOK:boolean; }) => (
  <span className={styles.error}>
    Oops...
    <br/>
    {
      !props.isOK ?
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
            Object.keys(props.error).length ?
            <>
              <br/>
              {JSON.stringify(props.error)}
            </>
            : null
          }
        </span>
      </>
    }
  </span>
);

export function PostEditor({ user }:{ user:Profile; }) {
  const router = useRouter();
  const toaster = useToaster();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [error, setError] = useState<AuthError | PostgrestError | null>();

  const isOK = content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length >= 8;

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
      <Editor
        title={title}
        content={content}
        show={showPrev}
        setTitle={setTitle}
        setContent={setContent}
        setShow={setShowPrev}
        setError={setError as any}
      />
      <div className={styles.footer}>
        <AsUser username={user.username} />
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
      { error ? <Error error={error} isOK={isOK} /> : null }
    </div>
  );
}

export function DraftEditor({ user, draft }:{ user:Profile; draft:Draft; }) {
  const router = useRouter();
  const toaster = useToaster();

  const [title, setTitle] = useState<string>(draft.title ?? "");
  const [content, setContent] = useState<string>(draft.content);
  const [showPrev, setShowPrev] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | PostgrestError | null>();

  const isOK = content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length >= 8;

  const onPost = async () => {
    const { error: postError } = await createPost(title, content);
    setError(postError as any);

    if (!postError) {
      const { error: draftError } = await deleteDraft(draft.id);
      setError(draftError as any);

      if (!draftError) { 
        toaster.add({ message: "Post added", icon: IoWine });
        router.push('/profile');
      }
    }
  };

  const onEdit = async () => {
    const { error } = await editDraft(draft.id, title, content);
    setError(error as any);

    if (!error) {
      toaster.add({ message: "Changes saved", icon: IoFolder });
      router.push('/profile/drafts');
    }
  };

  const onDelete = async () => {
    const { error } = await deleteDraft(draft.id);
    setError(error as any);

    if (!error) {
      toaster.add({ message: "Draft deleted", icon: RiDeleteBin6Line, type: "error" });
      router.push('/profile/drafts');
    }
  };

  return (
    <div className={styles.post}>
      <Editor
        title={title}
        content={content}
        show={showPrev}
        setTitle={setTitle}
        setContent={setContent}
        setShow={setShowPrev}
        setError={setError as any}
      />
      <div className={styles.footer}>
        <AsUser username={user.username} />
        <div className={styles.actions}>
          <Button
            noMinimum
            icon={{ element: RiDeleteBin6Line }}
            onClick={onDelete}
            color={colors.red}
            disabled={!user.username}
            iconBackground
          />
          <Button
            noMinimum
            icon={{ element: RiBallPenLine }}
            onClick={onEdit}
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
      { error ? <Error error={error} isOK={isOK} /> : null }
    </div>
  );
}
