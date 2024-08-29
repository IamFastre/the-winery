"use client";
import { useEffect, useState } from "react";
import { IoBookmark, IoHeart } from "react-icons/io5";

import { focusable, humanizeLikes } from "@/utils";
import { LoadingText } from "@/components/LoadingText";
import { getLikeCount, isPostLiked, isPostSaved, likePost, savePost } from "@/supabase/actions/post";

import styles from "./style.module.scss";

interface PostButtonsProps {
  postId: number;
}

export function PostButtons(props:PostButtonsProps) {
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
    <div className={`${styles.container} ${error ? styles.error : ""}`}>
      <div
        className={`${styles.count} ${isLiked && !error ? styles.isLiked : ""}`}
        {...focusable(styles.active, error ? undefined : () => onLike())}
      >
        <span>{humanizeLikes(lc)}</span>
        <IoHeart />
      </div>
      <div
        className={isSaved && !error ? styles.isSaved : ""}
        {...focusable(styles.active, error ? undefined : () => onSave())}
      >
        <IoBookmark />
      </div>
    </div>
  );
}
