"use client";
import { HTMLAttributes, ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { MdOpenInNew } from "@icons/md/MdOpenInNew";
import { C } from "@/components/C";
import { LoadingText } from "@/components/LoadingText";
import { UsernameHandle } from "@/components/UsernameHandle";
import { api, focusable } from "@/utils/client";
import { MarkDown } from ".";

export function CardTag(props:HTMLAttributes<HTMLSpanElement>) {
  const [title, setTitle] = useState<string | number | null>(null);
  const [author, setAuthor] = useState<string | null>(null);

  const id = parseInt((props.children as ReactElement[])[1].props.children);
  const isTwelve = id === 12;

  const { data:response, isLoading } = useQuery({
    queryFn: async () => await api("/card/post", { id }),
    queryKey: ["/card/post", id]
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

  const { data:cardRes, isLoading:cardLoading } = useQuery({
    queryFn: async () => await api("/card/post", { id }),
    queryKey: ["/card/post", id]
  });
  const card = cardRes?.data ?? null;

  const { data:userRes, isLoading:userLoading } = useQuery({
    queryFn: async () => card?.author_uuid ? await api('/user/info', { id: card.author_uuid }) : null,
    queryKey: ["user-info", card?.author_uuid],
    enabled: !!card?.author_uuid
  });
  const author = userRes?.data ?? null;

  const isLoading = cardLoading && userLoading;

  if (cardRes?.error)
    return (
      <div className="card-repost">
        <C.SECONDARY>
          {'> '} <C.RED>Card <C.SECONDARY>c:{id}</C.SECONDARY> not found ×</C.RED>
        </C.SECONDARY>
      </div>
    );

  if (userRes?.error)
    return (
      <div className="card-repost">
        <C.SECONDARY>
          {'> '} <C.RED>Couldn't load info of user <C.SECONDARY>{card!.author_uuid}</C.SECONDARY> ×</C.RED>
        </C.SECONDARY>
      </div>
    );

  if (isLoading || author === null || card === null)
    return (
      <div className="card-repost">
        <span>
          {'> '} <LoadingText text="Loading Repost" />
        </span>
      </div>
    );

  return (
    <div className="card-repost">
      {card.title && <h1>{card.title}</h1>}
      <MarkDown>
        {card.content}
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
        <a href={`/c/${id}`} {...focusable('active')}>
          <MdOpenInNew />
        </a>
      </div>
    </div>
  );
}