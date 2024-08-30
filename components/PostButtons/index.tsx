"use client";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import { IoBookmark, IoClose, IoHeart, IoHeartDislikeOutline, IoWarning } from "react-icons/io5";

import { focusable, humanizeLikes } from "@/utils";
import { Section, LoadingText, UsernameHandle } from "@/components";
import {  } from "@/components";
import { getLikeCount, getPostLikes, isPostLiked, isPostSaved, likePost, savePost } from "@/supabase/actions/post";
import { PublicProfile } from "@/supabase/actions/types";
import { Modal } from "@/providers/ModalProvider";

import styles from "./style.module.scss";
import Image from "next/image";

interface PostButtonsProps {
  postId: number;
}

interface LikesModalProps {
  postId: number;
  close: MouseEventHandler<HTMLDivElement>;
}

function LikesModal(props:LikesModalProps) {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [likers, setLikers] = useState<PublicProfile[]>([]);

  useEffect(() => {
    const start = async () => {
      const { data } = await getPostLikes(props.postId);

      if (data === null)
        setError(true);
      else
        setLikers(data);

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
  const [modalShown, setModalShown] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [lc, setLC] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    var start = async () => {
      const { count } = await getLikeCount(props.postId);
      const liked = await isPostLiked(props.postId);
      const saved = await isPostSaved(props.postId);

      if (count !== null)
        setLC(count);

      if (liked !== null)
        setIsLiked(liked);

      if (saved !== null)
        setIsSaved(saved);

      setError(liked === null && saved === null && count === null);
      setLoading(false);
    }

    setLoading(true);
    start();
  }, [props.postId])

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

  if (loading)
    return <LoadingText compact />;

  return (
    <>
      <div className={`${styles.container} ${error ? styles.error : ""}`}>
        <div
          className={isLiked && !error ? styles.isLiked : ""}
          {...focusable(styles.active, error ? undefined : () => onLike())}
        >
          <IoHeart />
        </div>
        <div
          className={isSaved && !error ? styles.isSaved : ""}
          {...focusable(styles.active, error ? undefined : () => onSave())}
        >
          <IoBookmark />
        </div>
      </div>
      <span className={styles.count} {...focusable(styles.active, () => setModalShown(true))}>
        {humanizeLikes(lc)}
        <span>
          {' '}
          {lc > 1 ? 'likes' : 'like'}
        </span>
      </span>

      <Modal shown={modalShown}>
        <LikesModal
          postId={props.postId}
          close={() => setModalShown(false)}
        />
      </Modal>
    </>
  );
}
