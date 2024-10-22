import { HTMLAttributes } from "react";
import MD, { Options } from "react-markdown";
import gfm from "remark-gfm";
import headingId from "remark-heading-id";
import superSub from "remark-supersub";

import userTag from "@/libs/remarkUserTag";
import cardTag from "@/libs/remarkCardTag";

import { CardTag } from "./client";
import styles from "./style.module.scss";

const plugins:Options["remarkPlugins"] = [
  [headingId, { defaults: true }],
  [gfm, { singleTilde: false }],
  superSub,
  userTag,
  cardTag,
];

function HandleSpan(props:HTMLAttributes<HTMLSpanElement>) {
  if (props.className?.includes("card-mention"))
    return <CardTag {...props} />;

  return <span {...props} />;
}

export function MarkDown(props:Options) {
  return <MD {...props} className={styles.self} remarkPlugins={plugins} components={{ 'span': HandleSpan }} />;
}
