"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import { IoCogOutline, IoInformationCircleOutline, IoPersonCircleOutline, IoSearchOutline, IoWineOutline, IoArrowBack, IoArrowForward } from "react-icons/io5";

import { focusable } from "@/utils/client";
import { Card, GoHomeLogo, Section } from "@/components";
import { Modal } from "@/providers/ModalProvider";
import { useShortcuts } from "@/providers/Shortcuts";
import { CardFeed } from "@/utils/api/card/feed";
import { useGoTo } from "@/hooks";

import layoutStyles from "./layout.module.scss";
import pageStyles from "./page.module.scss";


const getCardIndex = (param:string | null, max:number | undefined) => {
  if (!param)
    return 1;

  if (!max)
    max = 1;

  const result = Number.parseInt(param);

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

export function FeedNavigator({ posts, users }:CardFeed) {
  const card = getCardIndex(useSearchParams().get('card'), posts.length) - 1;
 
  const [index, setIndex] = useState<number>(card);
  const [inpt, setInpt] = useState<number>(index);
  const post = posts[index];
  const author = users[post.author_uuid ?? ""];


  const increment = (num:number = 1) => {
    if (posts)
      if (index + num < posts.length && index + num >= 0)
        setIndex(index + num);    
  };

  const submit = () => {
    increment(inpt - index);
    setInpt(index);
  };

  useEffect(() => {
    window.history.pushState(null, '', `?${setCardIndex(index + 1)}`);
    setInpt(index);
  }, [index]);

  useShortcuts([
    { key: 'ArrowRight', clickableId: 'go-forward' },
    { key: 'ArrowLeft', clickableId: 'go-back' },

    { key: 'l', alt: true, clickableId: 'like-post' },
    { key: 's', alt: true, clickableId: 'save-post' },
    { key: 'c', alt: true, clickableId: 'share-post' },
    { key: 'u', alt: true, clickableId: 'user-post' },
    { key: 'e', alt: true, clickableId: 'expand-post' },

    { key: 'l', alt: true, ctrl: true, clickableId: 'like-list' },
  ]);

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
        <div id="go-back" {...focusable(pageStyles.active, () => increment(-1))}>
          <IoArrowBack className={index <= 0 ? pageStyles.disabled : undefined} />
        </div>
        <input
          id="span"
          name="wine-page-number"
          type="number"
          value={inpt + 1}
          placeholder={`${index + 1}`}
          onChange={e => setInpt(e.target.valueAsNumber - 1)}
          onBlur={submit}
          onKeyDown={e => { if (e.key === 'Enter') { submit(); e.currentTarget.blur(); } }}
          style={{ width: `${inpt ? inpt.toFixed().length : index.toFixed().length}ch` }}
        />
        <div id="go-forward" {...focusable(pageStyles.active, () => increment(+1))}>
          <IoArrowForward className={index >= posts.length-1 ? pageStyles.disabled : undefined} />
        </div>
      </div>
    </>
  );
}

export function Sidebar({ username }:{ username:string; }) {
  const [redirecting, goto, current] = useGoTo();
  const modalShownState = useState<boolean>(false);

  const Icon = (props:{ icon:IconType; dest?:string; id:string, onClick?:() => void }) => {
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
        {...focusable(layoutStyles.active, handleClick)}
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
