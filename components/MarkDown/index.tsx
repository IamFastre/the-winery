'use client';
import { HTMLAttributes } from "react";
import RMD, { type Options } from "react-markdown";
import gfm from "remark-gfm";
import headingId from "remark-heading-id";
import superSub from "remark-supersub";

import tags from "@/libs/remarkTags";
import emoticon from "@/libs/remarkEmoticon";
import cardRepost from "@/libs/remarkCardRepost";

import { CardRepost, CardTag } from "./client";
import styles from "./style.module.scss";

const plugins:Options["remarkPlugins"] = [
  [headingId, { defaults: true }],
  [gfm, { singleTilde: false }],
  tags,
  superSub,
  emoticon,
  cardRepost,
];

function HandleSpan(props:HTMLAttributes<HTMLSpanElement>) {
  if (props.className?.includes("card-tag"))
    return <CardTag {...props} />;

  if (props.className?.includes("card-repost"))
    return <CardRepost {...props} />;

  return <span {...props} />;
}

export function MarkDown(props:Options) {
  return <RMD {...props} className={styles.self} remarkPlugins={plugins} components={{ 'span': HandleSpan }} />;
}
