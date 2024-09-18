"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import { IoCogOutline, IoInformationCircleOutline, IoPersonCircleOutline, IoSearchOutline, IoWineOutline, IoArrowBack, IoArrowForward } from "react-icons/io5";

import { focusable } from "@/utils";
import { Card, GoHomeLogo, Section } from "@/components";
import { Post, PublicProfile } from "@/supabase/actions/types";
import { useCardShortcuts, useGoTo } from "@/hooks";

import layoutStyles from "./layout.module.scss";
import pageStyles from "./page.module.scss";
import { Modal } from "@/providers/ModalProvider";


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
  const [inpt, setInpt] = useState<number>(index);
  const post = feed[index];
  const author = users[post.author ?? ""];


  const increment = (num:number = 1) => {
    if (feed)
      if (index + num < feed.length && index + num >= 0)
        setIndex(index + num);    
  };

  const submit = () => {
    increment(inpt - index);
    setInpt(index);
  };

  useCardShortcuts(post.id);

  useEffect(() => {
    window.history.pushState(null, '', `?${setCardIndex(index + 1)}`);
    setInpt(index);
  }, [index]);

  return (
    <>
      <Card
        username={author.username}
        userAvatar={author.avatar}
        title={post.title}
        content={post.content}
        timestamp={post.timestamp}
        postId={post.id}
        className={pageStyles.card}
        sectionClassName={pageStyles.cardSection}
      />

      <div className={pageStyles.quiver}>
        <div id={`go-back-${post.id}`} {...focusable(pageStyles.active, () => increment(-1)) as any}>
          <IoArrowBack className={index <= 0 ? pageStyles.disabled : undefined} />
        </div>
        <input
          id="span"
          name="wine-page-number"
          type="number"
          value={inpt + 1}
          placeholder={`${index + 1}`}
          onChange={e => setInpt(e.target.valueAsNumber - 1)}
          onBlur={e => submit()}
          onKeyDown={e => { if (e.key === 'Enter') { submit(); e.currentTarget.blur(); } }}
          style={{ width: `${inpt ? inpt.toFixed().length : index.toFixed().length}ch` }}
        />
        <div id={`go-forward-${post.id}`} {...focusable(pageStyles.active, () => increment(+1)) as any}>
          <IoArrowForward className={index >= feed.length-1 ? pageStyles.disabled : undefined} />
        </div>
      </div>
    </>
  );
}

export function Sidebar({ username }:{ username:string; }) {
  const [redirecting, goto, current] = useGoTo();
  const modalShownState = useState<boolean>(false);

  const Icon = (props:{ icon:IconType; dest?:string; id:string, onClick?: Function }) => {
    const handleClick = () => {
      if (props.dest) {
        props.onClick?.();
        goto(props.dest)
      } else if (props.onClick) {
        props.onClick();
      }
    };

    return (
      <div
        className={`${layoutStyles.icon} ${current.startsWith(props.dest!) ? layoutStyles.current : ""}`}
        id={props.id}
        {...focusable(layoutStyles.active, handleClick) as {}}
      >
        <props.icon />
      </div>
    );
  };

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
          <Icon icon={IoSearchOutline} id="search-page-button" dest={'/search'} />
          <Icon icon={IoPersonCircleOutline} id="user-page-button" dest={`/u/${username}`} />
          <Icon icon={IoWineOutline} id="compose-page-button" dest={'/compose'}/>
          <Icon icon={IoCogOutline} id="settings-page-button" onClick={() => modalShownState[1](s => !s)} />
          <Icon icon={IoInformationCircleOutline} id="info-page-button" dest={'/getting-started'} />
        </div>
      </div>

      <Modal state={modalShownState} closeButton>
        Soon...
      </Modal>
    </Section>
  );
}
