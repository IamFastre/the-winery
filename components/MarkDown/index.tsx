'use client';
import { HTMLAttributes } from "react";
import RMD, { type Options } from "react-markdown";
import gfm from "remark-gfm";
import headingId from "remark-heading-id";
import superSub from "remark-supersub";

import tags from "@/libs/remarkTags";
import emoticon from "@/libs/remarkEmoticon";
import cardRepost from "@/libs/remarkCardRepost";
import colorBlock from "@/libs/remarkColorBlock";

import { CardRepost, CardTag, TagProps, UserTag } from "./client";
import styles from "./style.module.scss";

const plugins:Exclude<Options["remarkPlugins"], null | undefined> = [
  [headingId, { defaults: true }],
  [gfm, { singleTilde: false }],
  superSub,
  tags,
  emoticon,
  cardRepost,
  colorBlock,
];

function HandleSpan(props:HTMLAttributes<HTMLSpanElement>) {
  if (props.className?.includes("card-tag"))
    return <CardTag {...props as TagProps} />;

  if (props.className?.includes("user-tag"))
    return <UserTag {...props as TagProps} />;

  if (props.className?.includes("card-repost"))
    return <CardRepost {...props} />;

  return <span {...props} />;
}

export function MarkDown(props:Options) {
  return (
    <RMD
      {...props}
      className={styles.self + ' ' + props.className}
      remarkPlugins={plugins.concat(props.remarkPlugins ?? [])}
      components={{ 'span': HandleSpan, ...props.components }}
    />
  );
}
