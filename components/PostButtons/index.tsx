"use client";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import { IoBookmark } from "@icons/io5/IoBookmark";
import { IoClose } from "@icons/io5/IoClose";
import { IoHeart } from "@icons/io5/IoHeart";
import { IoHeartDislikeOutline } from "@icons/io5/IoHeartDislikeOutline";
import { IoMedical } from "@icons/io5/IoMedical";
import { IoWarning } from "@icons/io5/IoWarning";
import { useQuery } from "@tanstack/react-query";

import { humanizeLikes } from "@/utils";
import { focusable } from "@/utils/client";
import { api } from "@/utils/client";
import { likePost, savePost } from "@/supabase/actions/post";
import { Modal } from "@/providers/ModalProvider";
import { C } from "@/components/C";
import { CardOptionsButton } from "@/components/CardOptionsButton";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { LoadingText } from "@/components/LoadingText";
import { Section } from "@/components/Section";
import { UsernameHandle } from "@/components/UsernameHandle";

import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";
import Image from "next/image";

interface PostButtonsProps {
  postId: number;
  postTitle: string | null;
  postContent: string;
  showShare?: boolean;
  showOptions?: boolean;
}

interface LikesModalProps {
  postId: number;
  close: MouseEventHandler<HTMLDivElement>;
}

function LikesModal(props:LikesModalProps) {
  const likeList = useQuery({
    queryFn: async () => (await api("/card/like-list", { id: props.postId })).data,
    queryKey: ['post-like-list', props.postId]
  });

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
          likeList.status === 'error' ?
            <div className={styles.noLikers}>
              <IoWarning />
              <span>
                Oops, an unexpected error has occurred
              </span>
            </div>
          : likeList.isPending ?
            <LoadingText compact />
          : likeList.data && (likeList.data.count > 0 || likeList.data.super_count > 0) ?
            <>
              {
                likeList.data.likers.map((l, i) => {
                  const isSuper = likeList.data!.super_likers.some(u => u.id === l.id);
                  return (
                    <Fragment key={`${l.username}:${i}`}>
                      <div className={`${styles.liker} ${isSuper ? styles.super : ''}`}>
                        <Image
                          src={l.avatar}
                          alt={`${l.username}'s avatar`}
                          width={42}
                          height={42}
                        />
                        <div className={styles.hasDisplayName}>
                          <span>{l.display_name ?? l.username}</span>
                          <UsernameHandle username={l.username} />
                        </div>
                      </div>
                      { i !== likeList.data!.count - 1 && <hr/> }
                    </Fragment>
                );
              })
              }
            </>
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
        setIsLiked(true);
        setLikeCount(c => c + 1);

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
      if (isLiked) {
        setLikeCount(c =>  c - 1);
        setIsLiked(false);

        setSuperLikeCount(c => c - 1);
        setIsSuperLiked(false);
      } else {
        setLikeCount(c =>  c + 1);
        setIsLiked(true);
      }
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
        {props.showShare   && <CopyLinkButton id={props.postId} activeClassName={styles.active} />}
        {props.showOptions && <CardOptionsButton id={props.postId} activeClassName={styles.active} postTitle={props.postTitle} postContent={props.postContent} vertical />}
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
              <C.HIGHLIGHT style={{ filter: `drop-shadow(0 0 2px ${colors.highlight}) drop-shadow(0 0 6px ${colors.highlight})` }}>
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
