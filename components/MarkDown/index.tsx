'use client';
import { HTMLAttributes } from "react";
import MD, { Options } from "react-markdown";
import gfm from "remark-gfm";
import headingId from "remark-heading-id";
import superSub from "remark-supersub";

import emoticon from "@/libs/remarkEmoticon";
import userTag from "@/libs/remarkUserTag";
import cardTag from "@/libs/remarkCardTag";
import cardRepost from "@/libs/remarkCardRepost";

import { CardRepost, CardTag } from "./client";
import styles from "./style.module.scss";

const plugins:Options["remarkPlugins"] = [
  [headingId, { defaults: true }],
  [gfm, { singleTilde: false }],
  superSub,
  emoticon,
  userTag,
  cardTag,
  cardRepost,
];

function HandleSpan(props:HTMLAttributes<HTMLSpanElement>) {
  if (props.className?.includes("card-mention"))
    return <CardTag {...props} />;

  if (props.className?.includes("card-repost"))
    return <CardRepost {...props} />;

  return <span {...props} />;
}

export function MarkDown(props:Options) {
  return <MD {...props} className={styles.self} remarkPlugins={plugins} components={{ 'span': HandleSpan }} />;
}
