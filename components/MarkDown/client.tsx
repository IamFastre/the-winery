"use client";
import { HTMLAttributes, useEffect, useState } from "react";

import { C, LoadingText } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/client";

export function CardTag(props:HTMLAttributes<HTMLSpanElement>) {
  if (!props.className?.includes("card-mention"))
    return <span {...props} />

  const [title, setTitle] = useState<string | number | null>(null);
  const [author, setAuthor] = useState<string | null>(null);

  const id = parseInt((props.children as any)[1].props.children);
  const isTwelve = id === 12;

  const { data:response, isLoading } = useQuery({
    queryFn: async () => isTwelve ? null : await api("/card/post", { id }),
    queryKey: ["share-button", id]
  });

  useEffect(() => {
    const resTitle = response?.data?.title;

    if (resTitle === undefined)
      setTitle(null);
    else if (resTitle === null)
      setTitle(id);
    else
      setTitle(resTitle);
  }, [response]);

  useEffect(() => {
    const start = async () => {
      if (response?.data?.author) {
        const { data:user } = await api('/user/info', { id: response.data.author_uuid! });
        setAuthor(user?.display_name ? `${user.display_name} (${user.username})` : user?.username ?? null);
      }
    }

    start();
  }, [response?.data?.author])

  let text:string | number | JSX.Element
    = isLoading || isTwelve
    ? <LoadingText compact />
    : title === null
    ? <C.RED>{id} ×</C.RED>
    : typeof(title) === 'number'
    ? `{${title}}`
    : title;

  return (
    <span
      className="card-mention"
      title={author ? `by ${author}` : isTwelve ? "ID 12 loads forever, a little easter egg" : title === null ? "Post not found" : undefined}
    >
      c:
      <a href={`/c/${id}`}>{text}</a>
    </span>
  );
}
