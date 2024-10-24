"use client";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import { IoBookmark, IoClose, IoHeart, IoHeartDislikeOutline, IoMedical, IoWarning } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";

import { humanizeLikes } from "@/utils";
import { focusable } from "@/utils/client";
import { api } from "@/utils/client";
import { Section, LoadingText, UsernameHandle, CopyLinkButton, C } from "@/components";
import { likePost, savePost } from "@/supabase/actions/post";
import { Tables } from "@/supabase/types";
import { Modal } from "@/providers/ModalProvider";

import colors from '@/styles/colors.module.scss';
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
      const { data } = await api("/card/like-list", { id: props.postId });

      if (!data)
        setError(true);
      else
        setLikers(data.likers);

      setLoading(false);
    }

    start();
  }, [props.postId]);

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
              <Fragment key={`${l.username}:${i}`}>
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

  const [likeCount, setLikeCount] = useState<number>(0);
  const [superLikeCount, setSuperLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSuperLiked, setIsSuperLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [canUseSuper, setCanUseSuper] = useState<boolean>(false);
  const [lastSuper, setLastSuper] = useState<number | null>(null);

  const interactions = useQuery({
    queryFn: async () => (await api("/card/interactions", { id: props.postId })).data,
    queryKey: ['post-interactions', props.postId],
  });

  const status = useQuery({
    queryFn: async () => (await api("/user/super-like-status")).data,
    queryKey: ['user-super-like-status'],
  });

  useEffect(() => {
    if (interactions.data) {
      setIsLiked(interactions.data.liked);
      setIsSuperLiked(interactions.data.super_liked);
      setIsSaved(interactions.data.saved);
      setLikeCount(interactions.data.like_count);
      setSuperLikeCount(interactions.data.super_like_count);
    }

    if (status.data) {
      setCanUseSuper(status.data.is_able);
      setLastSuper(status.data.last);
    }

    if (interactions.data === null || status.data === null)
      setError(true);
    else
      setError(false);
  }, [interactions.data, status.data]);

  const onSuperLike = async () => {
    const { data, error } = await api("/mut/card/super-like", { id: props.postId });

    if (error)
      setError(true);
    else if (data.done) {
      setCanUseSuper(data.last >= 24);
      if (data.action === 'like') {
        setSuperLikeCount(c => c + 1);
        setIsSuperLiked(true);
      } else {
        setSuperLikeCount(c => c - 1);
        setIsSuperLiked(false);
      }
    }
  };

  const onLike = async () => {
    const success = await likePost(props.postId, isLiked ? 'unlike' : 'like');

    if (!success)
      setError(true);
    else {
      setLikeCount(c => isLiked ? c - 1 : c + 1);
      setIsLiked(l => !l);
    }
  };

  const onSave = async () => {
    const success = await savePost(props.postId, isSaved ? 'unsave' : 'save');

    if (!success)
      setError(true);
    else
      setIsSaved(s => !s);
  };

  if (interactions.isLoading || status.isLoading)
    return <LoadingText compact />;

  return (
    <>
      <div className={`${styles.container} ${error ? styles.error : ""}`}>
        <div
          id="super-like-post"
          title={isSuperLiked ? "Unlike" : !canUseSuper && lastSuper !== null ? `${24 - lastSuper}h left...` : "Super Like"}
          className={`${styles.superLike} ${isSuperLiked ? styles.isSuperLiked : ''} ${canUseSuper || isSuperLiked ? '' : styles.cantSuperLike}`}
          {...focusable(styles.active, error || !(canUseSuper || isSuperLiked) ? undefined : onSuperLike)}
        >
          <IoMedical />
          <IoHeart />
        </div>
        <div
          id="like-post"
          title={isLiked ? "Unlike" : "Like"}
          className={isLiked && !error ? styles.isLiked : ""}
          {...focusable(styles.active, error ? undefined : onLike)}
        >
          <IoHeart />
        </div>
        <div
          id="save-post"
          title={isSaved ? "Unsave" : "Save"}
          className={isSaved && !error ? styles.isSaved : ""}
          {...focusable(styles.active, error ? undefined : onSave)}
        >
          <IoBookmark />
        </div>
        {props.showShare && <CopyLinkButton id={props.postId} activeClassName={styles.active} />}
      </div>
      <div
        id="like-list"
        className={styles.count}
        {...focusable(styles.active, () => modalShownState[1](s => !s))}
      >
        <div>
          <C.TERTIARY>
            {humanizeLikes(likeCount)}
          </C.TERTIARY>
          <C.SECONDARY>
            <i>
              {likeCount > 1 ? 'likes' : 'like'}
            </i>
          </C.SECONDARY>
        </div>
        { superLikeCount > 0 && <span>+</span> }
        {
          superLikeCount > 0 &&
            <div>
              <C.TERTIARY>
                {humanizeLikes(superLikeCount)}
              </C.TERTIARY>
              <C.HIGHLIGHT style={{ filter: `drop-shadow(0 0 2px ${colors.highlight}) drop-shadow(0 0 5px ${colors.highlight})` }}>
                <i>
                  super
                </i>
              </C.HIGHLIGHT>
            </div>
        }
      </div>

      <Modal state={modalShownState}>
        <LikesModal
          postId={props.postId}
          close={() => modalShownState[1](false)}
        />
      </Modal>
    </>
  );
}
