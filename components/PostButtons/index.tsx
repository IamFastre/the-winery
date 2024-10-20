"use client";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import { IoBookmark, IoClose, IoHeart, IoHeartDislikeOutline, IoWarning } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";

import { api, focusable, humanizeLikes } from "@/utils";
import { Section, LoadingText, UsernameHandle, CopyLinkButton } from "@/components";
import { likePost, savePost } from "@/supabase/actions/post";
import { Tables } from "@/supabase/types";
import { Modal } from "@/providers/ModalProvider";

import styles from "./style.module.scss";
import Image from "next/image";

interface PostButtonsProps {
  postId: number;
  showShare?: boolean;
}

interface LikesModalProps {
  postId: number;
  close: MouseEventHandler<HTMLDivElement>;
}

function LikesModal(props:LikesModalProps) {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [likers, setLikers] = useState<Tables<'profiles'>[]>([]);

  useEffect(() => {
    const start = async () => {
      const data = await api("/card/like-list", { id: props.postId });

      if ((data as any).message)
        setError(true);
      else
        setLikers(data.users);

      setLoading(false);
    }

    start();
  }, []);

  return (
    <Section className={styles.modalSection} containerClassName={styles.modalSectionContent}>
      <div className={styles.modalHead}>
        <span>
          Likes
        </span>
        <div className={styles.modalCloseButton} {...focusable(styles.active, props.close)}>
          <IoClose />
        </div>
      </div>
      <hr />
      <div className={styles.modalBody}>
        {
          error ?
            <div className={styles.noLikers}>
              <IoWarning />
              <span>
                Oops, an unexpected error has occurred
              </span>
            </div>
          : loading ?
            <LoadingText compact />
          : likers.length > 0 ?
            likers.map((l, i) => (
              <Fragment key={`${l.identifier}:${i}`}>
                <div className={styles.liker}>
                  <Image
                    src={l.avatar}
                    alt={`${l.username}'s avatar`}
                    width={40}
                    height={40}
                  />
                  {
                    l.display_name ?
                      <div className={styles.hasDisplayName}>
                        <span>{l.display_name}</span>
                        <UsernameHandle username={l.username} />
                      </div>
                    :
                      <UsernameHandle username={l.username} />
                  }
                </div>
                {
                  i !== likers.length - 1 &&
                  <hr />
                }
              </Fragment>
            ))
          :
          <div className={styles.noLikers}>
            <IoHeartDislikeOutline />
            <span>
              Oh well, no likes yet
            </span>
          </div>
        }
      </div>
    </Section>
  );
}

export function PostButtons(props:PostButtonsProps) {
  const modalShownState = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const [lc, setLC] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { data, status, isLoading } = useQuery({
    queryFn: async () => await api("/card/interactions", { id: props.postId }),
    queryKey: ['post-interactions', props.postId],
  });

  useEffect(() => {
    if (data) {
      setIsLiked(data.liked);
      setIsSaved(data.saved);
      setLC(data.likeCount);
      setError(false);
    } else if (status === 'error') {
      setError(true);
    }
  }, [data]);

  const onLike = async () => {
    const success = await likePost(props.postId, isLiked ? 'unlike' : 'like');

    if (!success)
      setError(true);
    else {
      setLC(c => isLiked ? c - 1 : c + 1);
      setIsLiked(l => !l)
    }
  };

  const onSave = async () => {
    const success = await savePost(props.postId, isSaved ? 'unsave' : 'save');

    if (!success)
      setError(true);
    else
      setIsSaved(s => !s)
  };

  if (isLoading)
    return <LoadingText compact />;

  return (
    <>
      <div className={`${styles.container} ${error ? styles.error : ""}`}>
        <div
          id="like-post"
          className={isLiked && !error ? styles.isLiked : ""}
          {...focusable(styles.active, error ? undefined : () => onLike())}
        >
          <IoHeart />
        </div>
        <div
          id="save-post"
          className={isSaved && !error ? styles.isSaved : ""}
          {...focusable(styles.active, error ? undefined : () => onSave())}
        >
          <IoBookmark />
        </div>
        {props.showShare && <CopyLinkButton id={props.postId} activeClassName={styles.active} />}
      </div>
      <span
        id="like-list"
        className={styles.count}
        {...focusable(styles.active, () => modalShownState[1](s => !s))}
      >
        {humanizeLikes(lc)}
        <span>
          {' '}
          {lc > 1 ? 'likes' : 'like'}
        </span>
      </span>

      <Modal state={modalShownState}>
        <LikesModal
          postId={props.postId}
          close={() => modalShownState[1](false)}
        />
      </Modal>
    </>
  );
}
