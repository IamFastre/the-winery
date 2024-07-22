"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import { IoCogOutline, IoInformationCircleOutline, IoPersonCircleOutline, IoSearchOutline, IoWineOutline, IoArrowBack, IoArrowForward } from "react-icons/io5";

import { focusable } from "@/utils";
import { Card, GoHomeLogo, Section } from "@/components";
import { Post, PublicProfile } from "@/supabase/actions/types";
import { useGoTo } from "@/hooks";

import layoutStyles from "./layout.module.scss";
import pageStyles from "./page.module.scss";


interface Props {
  feed: Post[];
  users: { [identifier:string]:PublicProfile; };
}

const getCardIndex = (param:string | null, max:number | undefined) => {
  if (!param)
    return 1;

  if (!max)
    max = 1;

  let result = Number.parseInt(param);

  if (Number.isNaN(result) || result < 1)
    return 1;

  if (result > max)
    return max;

  return result;
}

const setCardIndex = (value:number) => {
  const params = new URLSearchParams();
  params.set('card', value.toFixed(0));
  return params.toString();
};

export function FeedNavigator({ feed, users }:Props) {
  const card = getCardIndex(useSearchParams().get('card'), feed.length) - 1;
 
  const [index, setIndex] = useState<number>(card);
  const post = feed[index];
  const author = users[post.author ?? ""];

  const inc = (num:number = 1) => {
    if (feed)
      if (index + num < feed.length && index + num >= 0)
        setIndex(index + num);
  };

  useEffect(() => {
    window.history.pushState(null, '', `?${setCardIndex(index + 1)}`);
  }, [index])

  return (
    <>
      <Card
        username={author.username}
        userAvatar={author.avatar}
        title={post.title}
        content={post.content}
        timestamp={post.timestamp}
        className={pageStyles.card}
      />

      <div className={pageStyles.quiver}>
        <IoArrowBack
          className={index <= 0 ? pageStyles.disabled : null}
          {...focusable(pageStyles.active, () => inc(-1)) as any}
        />
        <span>
          {index+1}
        </span>
        <IoArrowForward
          className={index >= feed.length-1 ? pageStyles.disabled : null}
          {...focusable(pageStyles.active, () => inc(+1)) as any}
        />
      </div>      
    </>
  );
}

export function Sidebar() {
  const [redirecting, goto, current] = useGoTo();

  const Icon = (props:{ icon:IconType; dest?:string; }) => (
    <props.icon
      className={`${layoutStyles.icon} ${current.startsWith(props.dest!) ? layoutStyles.current : ""}`}
      {...focusable(layoutStyles.active, props.dest ? () => goto(props.dest!) : undefined) as {}}
    />
  );

  return (
    <Section style={{ flex: 1 }} containerStyle={{ borderStyle: redirecting ? 'dashed' : 'solid' }}>
      <div className={layoutStyles.nav}>
        <GoHomeLogo
          redirecting={redirecting}
          goto={goto}
          className={layoutStyles.image}
        />
        <div className={layoutStyles.sep} />
        <div className={layoutStyles.icons}>
          <Icon icon={IoSearchOutline} />
          <Icon icon={IoPersonCircleOutline} dest='/profile' />
          <Icon icon={IoWineOutline} dest='/compose'/>
          <Icon icon={IoCogOutline} />
          <Icon icon={IoInformationCircleOutline} dest='/getting-started' />
        </div>
      </div>
    </Section>
  );
}
