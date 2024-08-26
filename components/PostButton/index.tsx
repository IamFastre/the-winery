"use client";
import { useEffect, useState } from "react";
import { IoBookmark, IoHeart } from "react-icons/io5";

import { focusable } from "@/utils";
import { isPostSaved, savePost } from "@/supabase/actions/post";

import styles from "./style.module.scss";
import { LoadingText } from "../LoadingText";

interface PostButtonsProps {
  postId: number;
}

export function PostButtons(props:PostButtonsProps) {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    var start = async () => {
      const res = await isPostSaved(props.postId);
      
      if (res !== null)
        setIsSaved(res);

      setError(res === null);
      setLoading(false);
    }

    setLoading(true);
    start();
  }, [props.postId])

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
      {/* <div
        className={isLiked && !error ? styles.isLiked : ""}
        {...focusable(styles.active, error ? undefined : () => onLike())}
      >
        <IoHeart />
      </div> */}
      <div
        className={isSaved && !error ? styles.isSaved : ""}
        {...focusable(styles.active, error ? undefined : () => onSave())}
      >
        <IoBookmark />
      </div>
    </div>
  );
}