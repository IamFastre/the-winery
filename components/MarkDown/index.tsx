import MD, { Options } from "react-markdown";
import gfm from "remark-gfm";
import headingId from "remark-heading-id";
import superSub from "remark-supersub";
import userTag from "@/libs/remarkUserTag";

import styles from "./style.module.scss";

const plugins:Options["remarkPlugins"] = [
  [headingId, { defaults: true }],
  [gfm, { singleTilde: false }],
  superSub,
  userTag,
];

export function MarkDown(props:Options) {
  return <MD {...props} className={styles.self} remarkPlugins={plugins} />;
}
