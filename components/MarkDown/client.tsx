"use client";
import { getPost } from "@/supabase/actions/post";
import { HTMLAttributes, useEffect, useState } from "react";

import { C, LoadingText } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getPublicProfile } from "@/supabase/actions/user";

export function CardTag(props:HTMLAttributes<HTMLSpanElement>) {
  if (!props.className?.includes("card-mention"))
    return <span {...props} />

  const [title, setTitle] = useState<string | number | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [isTwelve, setIsTwelve] = useState<boolean>(false);

  const id = parseInt((props.children as any)[1].props.children);
  const { data:respond, isLoading } = useQuery({
    queryFn: async () => await getPost(id),
    queryKey: ["share-button", id]
  });

  useEffect(() => {
    const resTitle = respond?.data?.title;

    if (id === 12)
      setIsTwelve(true);

    if (resTitle === undefined)
      setTitle(null);
    else if (resTitle === null)
      setTitle(id);
    else
      setTitle(resTitle);
  }, [respond]);

  useEffect(() => {
    const start = async () => {
      if (respond?.data?.author) {
        const { data } = await getPublicProfile(respond.data.author);
        setAuthor(data?.display_name ? `${data.display_name} (${data.username})` : data?.username ?? null);
      }
    }

    start();
  }, [respond?.data?.author])

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
