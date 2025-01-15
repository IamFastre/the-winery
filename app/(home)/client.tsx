"use client";
import { MouseEventHandler, useEffect, useState } from "react";
import { IconType } from "@react-icons/all-files";
import { useQuery } from "@tanstack/react-query";

import { IoCogOutline } from "@icons/io5/IoCogOutline";
import { IoInformationCircleOutline } from "@icons/io5/IoInformationCircleOutline";
import { IoPersonCircleOutline } from "@icons/io5/IoPersonCircleOutline";
import { IoSearchOutline } from "@icons/io5/IoSearchOutline";
import { IoWineOutline } from "@icons/io5/IoWineOutline";
import { IoArrowBack } from "@icons/io5/IoArrowBack";
import { IoArrowForward } from "@icons/io5/IoArrowForward";
import { IoAdd } from "@icons/io5/IoAdd";
import { IoList } from "@icons/io5/IoList";
import { IoColorPalette } from "@icons/io5/IoColorPalette";

import consts, { options } from "@/utils/consts";
import { LocalStorage } from "@/utils";
import { api, focusable } from "@/utils/client";
import { Modal } from "@/providers/ModalProvider";
import { useShortcuts } from "@/providers/Shortcuts";
import { useGoTo } from "@/hooks";
import { Card } from "@/components/Card";
import { GoHomeLogo } from "@/components/GoHomeLogo";
import { Section } from "@/components/Section";
import { DropdownButton } from "@/components/DropdownButton";
import { C, RI } from "@/components/C";
import { LoadingText } from "@/components/LoadingText";
import { ErrorPage } from "@/components/Pages";

import layoutStyles from "./layout.module.scss";
import pageStyles from "./page.module.scss";


const sortByOptions = [
  "Default",
  "Newest",
  "Random",
];

const themeOptions = [
  "Dark",
  "Light",
  "Scarlatta",
];

function ActionsButton({ refetch, refetching }:{ refetch: () => void; refetching:boolean; }) {
  const [actionsOpen, setActionsOpen] = useState<boolean>(false);
  const [themeI, setThemeI] = useState<number>(0);

  // const onlyFollowing = Storage.get("feed:only-following") ?? false;
  // const focusMode = Storage.get("feed:focus-mode") ?? false;

  const sortBy = LocalStorage.get("feed:sort-by") ?? "default";
  const sortI = options['feed']['sort-by'].indexOf(sortBy);

  const onSelectSort = (o:string, i:number) => {
    LocalStorage.set("feed:sort-by", options['feed']['sort-by'][i]);
    refetch();
  };

  // this shit is temporary until we do the settings
  const onSelectTheme = (o:string, i:number) => {
    document.children[0].setAttribute("data-theme", o.toLowerCase());
    setThemeI(i);
  };

  // const onClickFollowing = () => {
  //   Storage.set("feed:only-following", !onlyFollowing);
  //   refetch();
  // };
  
  // const onClickFocus = () => {
  //   Storage.set("feed:focus-mode", !focusMode);
  //   refetch();
  // };

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
            title={refetching ? <LoadingText /> : "Sort by"}
            subtitle={sortByOptions[sortI]}
            icon={IoList}
            onSelect={onSelectSort}
            selectedIndices={[sortI]}
            options={sortByOptions}
          />
          <DropdownButton
            title="Theme"
            subtitle={themeOptions[themeI]}
            icon={IoColorPalette}
            onSelect={onSelectTheme}
            selectedIndices={[themeI]}
            options={themeOptions}
          />
          {/* <div className={pageStyles.actionsSmall}>
            <Button
              title="Only Following"
              color={onlyFollowing ? colors.green : colors.red}
              onClick={onClickFollowing}
            />
            <Button
              title="Focus Mode"
              color={focusMode ? colors.green : colors.red}
              onClick={onClickFocus}
            />
          </div> */}
        </div>
      </div>
      <div {...focusable(pageStyles.active, () => setActionsOpen(a => !a))}>
        <IoAdd />
      </div>
    </div>
  );
}

export function FeedNavigator() {
  const query = useQuery({
    queryFn: async () => await api("/card/feed", { sort: LocalStorage.get('feed:sort-by') ?? undefined }),
    queryKey: ["/card/feed"],
    refetchOnWindowFocus: false,
  });

  const [index, setIndex] = useState<number>(0);
  const [inpt, setInpt] = useState<number>(index);

  const posts = query.data?.data?.posts;
  const users = query.data?.data?.users;

  const post = posts?.[index];
  const author = users?.[post?.author_uuid ?? ""];

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

  if (query.data?.error) {
    return (
      <ErrorPage
        message={query.data.error.message}
        code={query.data.error.code}
        noCard
      />
    );
  }

  if (query.isLoading || !author || !post) {
    return (
      <LoadingText />
    );
  }

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
          <IoArrowForward className={`${pageStyles.forwardArrow} ${index >= posts.length - 1 ? pageStyles.disabled : undefined}`} />
        </div>
      </div>

      <ActionsButton
        refetch={() => query.refetch()}
        refetching={query.isRefetching}
      />
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
