"use client";
import { MouseEventHandler, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconType } from "@react-icons/all-files";

import { IoCogOutline } from "@icons/io5/IoCogOutline";
import { IoInformationCircleOutline } from "@icons/io5/IoInformationCircleOutline";
import { IoPersonCircleOutline } from "@icons/io5/IoPersonCircleOutline";
import { IoSearchOutline } from "@icons/io5/IoSearchOutline";
import { IoWineOutline } from "@icons/io5/IoWineOutline";
import { IoArrowBack } from "@icons/io5/IoArrowBack";
import { IoArrowForward } from "@icons/io5/IoArrowForward";
import { IoAdd } from "@icons/io5/IoAdd";

import consts from "@/utils/consts";
import { focusable } from "@/utils/client";
import { Modal } from "@/providers/ModalProvider";
import { useShortcuts } from "@/providers/Shortcuts";
import { CardFeed } from "@/utils/api/card/feed";
import { useGoTo } from "@/hooks";
import { Card } from "@/components/Card";
import { GoHomeLogo } from "@/components/GoHomeLogo";
import { Section } from "@/components/Section";
import { DropdownButton } from "@/components/DropdownButton";

import layoutStyles from "./layout.module.scss";
import pageStyles from "./page.module.scss";
import { C, RI } from "@/components/C";
import { Button } from "@/components/Button";
import colors from "@/styles/colors";


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

const sortByOptions = [
  "Default",
  "Newest",
  "Random",
];

function ActionsButton() {
  const [actionsOpen, setActionsOpen] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState<number>(0);
  const [onlyFollowing, setOnlyFollowing] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);

  const onSelectSort = (o:string, i:number) => {
    setSortBy(i);
    console.log(o);
  }

  return (
    <div
      className={`${pageStyles.actions} ${actionsOpen ? pageStyles.open : ''}`}
    >
      <div className={pageStyles.actionsContent}>
        <span className={pageStyles.actionsTitle}>
          Actions
        </span>
        <div className={pageStyles.actionsArray}>
          <DropdownButton
            title="Sort by"
            subtitle={sortByOptions[sortBy]}
            onSelect={onSelectSort}
            selectedIndices={[sortBy]}
            options={sortByOptions}
          />
          <div className={pageStyles.actionsSmall}>
            <Button
              title="Only Following"
              color={onlyFollowing ? colors.green : colors.red}
              onClick={() => setOnlyFollowing(f => !f)}
            />
            <Button
              title="Focus Mode"
              color={focusMode ? colors.green : colors.red}
              onClick={() => setFocusMode(f => !f)}
            />
          </div>
        </div>
        <C.SECONDARY>
          <i>
            <span style={{ fontSize: 'smaller' }}>
              Only a mock! Not functional now.
            </span>
          </i>
        </C.SECONDARY>
      </div>
      <div {...focusable(pageStyles.active, () => setActionsOpen(a => !a))}>
        <IoAdd />
      </div>
    </div>
  );
}

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
    { key: 'u', alt: true, clickableId: 'user-post' },
    { key: 'e', alt: true, clickableId: 'expand-post' },
    { key: 'c', alt: true, clickableId: 'share-post' },
    { key: 'o', alt: true, clickableId: 'options-post' },
    
    { key: 's', alt: true, ctrl: true, clickableId: 'super-like-post' },
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
          <IoArrowBack className={`${pageStyles.backArrow} ${index <= 0 ? pageStyles.disabled : undefined}`} />
        </div>
        <input
          id="span"
          name="wine-page-number"
          type="number"
          inputMode="numeric"
          value={inpt + 1}
          placeholder={`${index + 1}`}
          onChange={e => setInpt(e.target.valueAsNumber - 1)}
          onBlur={submit}
          onKeyDown={e => { if (e.key === 'Enter') { submit(); e.currentTarget.blur(); } }}
          style={{ width: `${inpt ? (inpt + 1).toFixed().length : (index + 1).toFixed().length}ch` }}
        />
        <div id="go-forward" {...focusable(pageStyles.active, () => increment(+1))}>
          <IoArrowForward className={`${pageStyles.forwardArrow} ${index >= posts.length-1 ? pageStyles.disabled : undefined}`} />
        </div>
      </div>

      <ActionsButton />
    </>
  );
}

export function Sidebar({ username }:{ username:string; }) {
  const [redirecting, goto, current] = useGoTo();
  const modalShownState = useState<boolean>(false);

  const Icon = (props:{ icon:IconType; dest?:string; id:string, onClick?:() => void }) => {
    const handleClick:MouseEventHandler<HTMLElement> = e => {
      if (props.dest) {
        props.onClick?.();
        goto(props.dest, 'push', e.ctrlKey);
      } else if (props.onClick) {
        props.onClick();
      }
    };

    return (
      <div
        className={`${layoutStyles.icon} ${current.startsWith(props.dest!) ? layoutStyles.current : ""}`}
        id={props.id}
        {...focusable(layoutStyles.active, current.startsWith(props.dest!) ? undefined : handleClick)}
      >
        <a href={props.dest} onClick={e => e.preventDefault()} type="wrapper">
          <props.icon />
        </a>
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
        <C.ACCENT style={{ position: 'absolute', bottom: 30, fontSize: 'smaller' }}>
          <RI>
            v{consts.version}
          </RI>
        </C.ACCENT>
      </Modal>
    </Section>
  );
}
