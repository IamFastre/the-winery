"use client";
import { useState } from "react";
import moment from "moment";

import { getZodiacString, numberOrder, vowelStart } from "@/utils";
import { focusable } from "@/utils/client";
import { UserInfo } from "@/utils/api/user/info";
import { C, RI, Zodiac } from "@/components";
import { ProfileBadge } from "../ProfileBadge";

import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";

export function Bio(props:{ content:string; anniversary:UserInfo['anniversary'] }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const sign = props.anniversary ? getZodiacString(props.anniversary.d, props.anniversary.m) : null;

  return (
    <div className={`${styles.bio} ${expanded ? styles.expanded : ""}`}>
      <span {...focusable("", () => setExpanded(e => !e))}>
        {props.content}
      </span>
      <div className={styles.badgeShelf}>
        <ProfileBadge
          condition={props.anniversary !== null}
          title="Anniversary"
          description={(
            <span>
              This user is {sign && vowelStart(sign) ? 'an' : 'a'} <C.COLD>{sign}</C.COLD>
              <Zodiac fill={colors.cold} date={props.anniversary!} size={26} />
              <br/>
              Their anniversary is on <C.SECONDARY><RI>{moment.months(props.anniversary!.m - 1)} {numberOrder(props.anniversary!.d)}</RI></C.SECONDARY>.
            </span>
          )}
        >
          <Zodiac
            fill={colors.cold}
            date={props.anniversary!}
          />
        </ProfileBadge>
      </div>
    </div>
  );
}
