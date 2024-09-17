"use client";
import { getPost } from "@/supabase/actions/post";
import { HTMLAttributes, useEffect, useState } from "react";

import { C, LoadingText } from "@/components";

export function CardTag(props:HTMLAttributes<HTMLSpanElement>) {
  if (!props.className?.includes("card-mention"))
    return <span {...props} />

  const [title, setTitle] = useState<string | number | undefined | null>(undefined);
  const id = parseInt((props.children as any)[1].props.children);

  useEffect(() => {
    const start = async () => {
      const { data } = await getPost(id);
      if (data)
        setTitle(data.title ?? id);
      else
        setTitle(null);
    };
    start();
  }, [id]);

  let text:string | number | JSX.Element
    = title === undefined
    ? <LoadingText compact />
    : title === null
    ? <C.RED>{id} ×</C.RED>
    : typeof(title) === 'number'
    ? `{${title}}`
    : title;

  return (
    <span className="card-mention">
      c:
      <a href={`/c/${id}`}>{text}</a>
    </span>
  );
}
