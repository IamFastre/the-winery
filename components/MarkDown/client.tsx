"use client";
import { HTMLAttributes, ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import { IoExpand } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";

import { C, LoadingText, MarkDown, UsernameHandle } from "@/components";
import { api } from "@/utils/client";
import { UserInfo } from "@/utils/api/user/info";

export function CardTag(props:HTMLAttributes<HTMLSpanElement>) {
  const [title, setTitle] = useState<string | number | null>(null);
  const [author, setAuthor] = useState<string | null>(null);

  const id = parseInt((props.children as ReactElement[])[1].props.children);
  const isTwelve = id === 12;

  const { data:response, isLoading } = useQuery({
    queryFn: async () => await api("/card/post", { id }),
    queryKey: ["card-tag", id]
  });

  useEffect(() => {
    const resTitle = response?.data?.title;

    if (resTitle === undefined)
      setTitle(null);
    else if (resTitle === null)
      setTitle(id);
    else
      setTitle(resTitle);
  }, [id, response]);

  useEffect(() => {
    const start = async () => {
      if (response?.data?.author_uuid) {
        const { data:user } = await api('/user/info', { id: response.data.author_uuid! });
        setAuthor(user?.display_name ? `${user.display_name} (${user.username})` : user?.username ?? null);
      }
    }

    start();
  }, [response?.data?.author_uuid])

  const text:string | number | JSX.Element
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

export function CardRepost(props:HTMLAttributes<HTMLSpanElement>) {
  const id = parseInt(props.id ?? "0");
  const [author, setAuthor] = useState<UserInfo | null>(null);

  const { data:response, isLoading } = useQuery({
    queryFn: async () => await api("/card/post", { id }),
    queryKey: ["card-tag", id]
  });

  useEffect(() => {
    const start = async () => {
      if (response?.data?.author_uuid) {
        const { data:user } = await api('/user/info', { id: response.data.author_uuid! });
        setAuthor(user);
      }
    }

    start();
  }, [response?.data?.author_uuid])

  if (response?.error)
    return (
      <div className="card-repost">
        <C.SECONDARY>
          {'> '} <C.RED>Card <C.SECONDARY>c:{id}</C.SECONDARY> not found ×</C.RED>
        </C.SECONDARY>
      </div>
    );

  if (isLoading || author === null)
    return (
      <div className="card-repost">
        <span>
          {'> '} <LoadingText text="Loading Repost" />
        </span>
      </div>
    );

  return (
    <div className="card-repost">
      {response?.data?.title && <h1>{response?.data?.title}</h1>}
      <MarkDown>
        {response?.data?.content}
      </MarkDown>
      <div>
        <Image
          src={author.avatar}
          alt={`${author.username}'s profile picture`}
          width={256}
          height={256}
        />
        <div>
          <span>
            {author.display_name ?? author.username}
          </span>
          <UsernameHandle username={author.username} />
        </div>
        <a href={`/c/${id}`}>
          <IoExpand />
        </a>
      </div>
    </div>
  );
}