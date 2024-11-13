"use client";
import { useState } from "react";
import moment from "moment";

import { focusable } from "@/utils/client";
import { UserInfo } from "@/utils/api/user/info";
import { Zodiac } from "@/components";

import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";

export function Bio(props:{ content:string; anniversary:UserInfo['anniversary'] }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className={`${styles.bio} ${expanded ? styles.expanded : ""}`}>
      <span {...focusable("", () => setExpanded(e => !e))}>
        {props.content}
      </span>
      { props.anniversary &&
        <div title={`${props.anniversary.d} ${moment.months(props.anniversary.m - 1)}`}>
          <Zodiac
            fill={colors.cold}
            date={props.anniversary}
          />
        </div>
      }
    </div>
  );
}
