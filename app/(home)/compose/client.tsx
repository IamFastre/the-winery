"use client";
import { useEffect, useState } from "react";
import { RiBallPenLine, RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { IoEyeOutline, IoEye, IoFolderOutline, IoAdd, IoWine, IoFolder } from "react-icons/io5";
import XRegExp from "xregexp";

import { SetState } from "@/utils";
import { Section, MarkDown, Button, C, LoadingText } from "@/components";
import { createPost, createDraft, editDraft, deleteDraft } from "@/supabase/actions/post";
import { type AuthError, PostgrestError } from "@supabase/supabase-js";
import { Draft, Profile } from "@/supabase/actions/types";
import { useToaster } from "@/providers/Toaster";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";

interface EditorProps {
  title: string;
  content: string;
  show: boolean;
  setShow: SetState<boolean>;
  setTitle: SetState<string>;
  setContent: SetState<string>;
  resetError: () => void;
}

const Editor = (props:EditorProps) => {
  const toaster = useToaster();

  useEffect(() => {
    const handler = (e:BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = true;
      toaster.add({ message: "You can always draft your card for later editing", icon: IoFolder, duration: 7500 });
    };

    if (!!props.title.length || !!props.content.length)
      window.addEventListener('beforeunload', handler)

    return () => window.removeEventListener('beforeunload', handler);
  }, [!!props.title.length, !!props.content.length]);

  return (
    <div className={styles.editor}>
      <Section
        title={props.show ?
          props.title :
          <input
            type="text"
            id="span"
            name="wine-card-title"
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
            id="span"
            name="wine-card-content"
            placeholder="What's on your mind? (min. 8)"
            value={props.content}
            onChange={e => { props.setContent(e.target.value); props.resetError(); }}
            onBlur={() => props.setContent(c => c.trim())}
            autoComplete="off"
          />
        }
      </Section>
      <Button
        noMinimum
        iconBackground
        className={styles.showPrev}
        onClick={() => props.setShow(!props.show)}
        color={colors.highlight}
        icon={{ element: props.show ? IoEyeOutline : IoEye }}
      />
    </div>
  );
};

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
          Oops, seems an error has occurred, try again?
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
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<AuthError | PostgrestError | null>(null);

  const isEnough = content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length >= 8;

  const onPost = async () => {
    setUploading(true);
    const { error: postError } = await createPost(title, content);
    setError(postError);

    if (!postError) {
      toaster.add({ message: "Post added", icon: IoWine });
      router.push(`/u/${user.username}`);
      setUploading(false);
    }
  };

  const onDraft = async () => {
    setUploading(true);
    const { error: draftError } = await createDraft(title, content);
    setError(draftError);

    if (!draftError) {
      toaster.add({ message: "Draft added", icon: IoFolder });
      router.push('/drafts');
      setUploading(false);
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
        resetError={() => setError(null)}
      />
      <div className={styles.footer}>
        <AsUser username={user.username} />
        <div className={styles.actions}>
          {uploading && <LoadingText className={styles.loading} compact />}
          <Button
            noMinimum
            icon={{ element: IoFolderOutline }}
            onClick={onDraft}
            disabled={!(isEnough && user.username) || uploading}
          />
          <Button
            noMinimum
            title="Post"
            icon={{ element: IoAdd }}
            onClick={onPost}
            disabled={!(isEnough && user.username) || uploading}
          />
        </div>
      </div>
      { error ? <Error error={error} isOK={isEnough} /> : null }
    </div>
  );
}

export function DraftEditor({ user, draft }:{ user:Profile; draft:Draft; }) {
  const router = useRouter();
  const toaster = useToaster();

  const [title, setTitle] = useState<string>(draft.title ?? "");
  const [content, setContent] = useState<string>(draft.content);
  const [showPrev, setShowPrev] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<AuthError | PostgrestError | null>(null);

  const isEnough = content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length >= 8;

  const onPost = async () => {
    setUploading(true);
    const { error: postError } = await createPost(title, content);
    setError(postError);

    if (!postError) {
      const { error: draftError } = await deleteDraft(draft.id);
      setError(draftError);

      if (!draftError) { 
        toaster.add({ message: "Post added", icon: IoWine });
        router.push(`/u/${user.username}`);
        setUploading(false);
      }
    }
  };

  const onEdit = async () => {
    setUploading(true);
    const { error } = await editDraft(draft.id, title, content);
    setError(error);

    if (!error) {
      toaster.add({ message: "Changes saved", icon: IoFolder });
      router.push('/drafts');
      setUploading(false);
    }
  };

  const onDelete = async () => {
    setUploading(true);
    const { error } = await deleteDraft(draft.id);
    setError(error);

    if (!error) {
      toaster.add({ message: "Draft deleted", icon: RiDeleteBin6Line, type: "error" });
      router.push('/drafts');
      setUploading(false);
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
        resetError={() => setError(null)}
      />
      <div className={styles.footer}>
        <AsUser username={user.username} />
        <div className={styles.actions}>
          {uploading && <LoadingText className={styles.loading} compact />}
          <Button
            noMinimum
            icon={{ element: RiDeleteBin6Line }}
            onClick={onDelete}
            color={colors.red}
            disabled={!user.username || uploading}
            iconBackground
          />
          <Button
            noMinimum
            icon={{ element: RiBallPenLine }}
            onClick={onEdit}
            disabled={!(isEnough && user.username) || uploading}
          />
          <Button
            noMinimum
            title="Post"
            icon={{ element: IoAdd }}
            onClick={onPost}
            disabled={!(isEnough && user.username) || uploading}
          />
        </div>
      </div>
      { error ? <Error error={error} isOK={isEnough} /> : null }
    </div>
  );
}
