"use client";
import { HTMLAttributes } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { MdOpenInNew } from "@icons/md/MdOpenInNew";
import { C } from "@/components/C";
import { LoadingText } from "@/components/LoadingText";
import { UsernameHandle } from "@/components/UsernameHandle";
import { api, focusable } from "@/utils/client";
import { MarkDown } from ".";

export type TagProps = HTMLAttributes<HTMLSpanElement> & { 'data-tag': string };

export function UserTag(props:TagProps) {
  const username = props['data-tag'];

  const { data:response, isLoading } = useQuery({
    queryFn: async () => await api("/user/info", { username }),
    queryKey: ["/card/post", username]
  });

  const name  = response?.data?.display_name ?? null;
  const user  = response?.data ?? null;
  const error = response?.error;

  return (
    <span
      className={props.className}
      title={error ? "Not Found" : isLoading ? "Loading..." : name!}
    >
      u:
      <a href={`/u/${username}`} className={error ? "error" : undefined}>
        {username}
        {isLoading && <LoadingText compact />}
        {error && <C.RED>?</C.RED>}
        {user && <Image src={user.avatar} alt={`${user.username}'s profile picture`} width={256} height={256} /> }
      </a>
    </span>
  );
}

export function CardTag(props:TagProps) {
  const id = parseInt(props['data-tag']);
  const isTwelve = id === 12;

  const { data:postQ, isLoading:isPostLoading } = useQuery({
    queryFn: async () => await api("/card/post", { id }),
    queryKey: ["/card/post", id]
  });

  const card = postQ?.data ?? null;

  const { data:userQ, isLoading:isUserLoading } = useQuery({
    queryFn: async () => card?.author_uuid ? await api("/user/info", { id: card.author_uuid }) : null,
    queryKey: ["/user/info", card?.author_uuid],
    enabled: !!card?.author_uuid
  });

  const author = userQ?.data ?? null;
  const isLoading = isPostLoading || isUserLoading || isTwelve;
  const error = Boolean(postQ?.error || userQ?.error) && !isTwelve;

  return (
    <span
      className={props.className}
      title={isPostLoading ? "Loading Post..." : isUserLoading ? "Loading User..." : `by ${author?.display_name ?? author?.username}`}
    >
      c:
      <a href={`/c/${id}`} className={error ? "error" : undefined}>
        {card?.title ?? (isLoading ? id : `{${id}}`)}
        {isLoading && <LoadingText compact />}
        {error && <C.RED>?</C.RED>}
        { author &&
          <span style={{ marginLeft: '5px', fontSize: '12px', fontStyle: 'italic', opacity: 0.75 }}>
            (
            <C.QUINARY>
              u:
            </C.QUINARY>
            <C.ACCENT>
              {author.username}
            </C.ACCENT>
            )
          </span>
        }
      </a>
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
    queryFn: async () => card?.author_uuid ? await api("/user/info", { id: card.author_uuid }) : null,
    queryKey: ["/user/info", card?.author_uuid],
    enabled: !!card?.author_uuid
  });

  const author = userRes?.data ?? null;
  const isLoading = cardLoading || userLoading;

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