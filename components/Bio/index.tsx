"use client";
import { useState } from "react";
import moment from "moment";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { GiToaster } from "react-icons/gi";

import { getZodiacString, numberOrder, vowelStart } from "@/utils";
import { focusable } from "@/utils/client";
import { UserInfo } from "@/utils/api/user/info";
import { C, RI, Zodiac, ProfileBadge } from "@/components";

import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";

interface BioProps {
  content: string;
  anniversary: UserInfo['anniversary'];
  gender: UserInfo['gender'];
}

function GenderBadge({ gender }:{ gender:BioProps['gender'] }) {
  const Icon = gender === 'male' ? IoMdMale : gender === 'female' ? IoMdFemale : GiToaster;
  const color = gender === 'male' ? colors.cyan : gender === 'female' ? colors.magenta : colors.yellow;

  return (
    <ProfileBadge
      condition={gender !== null}
      title="Gender"
      description={(
        <span>
          This user is a <span style={{ color }}>{gender}</span> <Icon size={15} color={color} />
          {
            gender === 'toaster' && (
              <>
                <br/>
                <C.SECONDARY style={{ fontSize: 'smaller' }}>
                  <RI>
                    We advise against taking a bath with them.
                  </RI>
                </C.SECONDARY>
              </>
            )
          }
        </span>
      )}
    >
      <Icon
        size={30}
        color={color}
      />
    </ProfileBadge>
  );
}

function ZodiacBadge({ anniversary }:{ anniversary:BioProps['anniversary'] }) {
  const sign = anniversary ? getZodiacString(anniversary.d, anniversary.m) : null;
  const date = anniversary ? `${moment.months(anniversary.m - 1)} ${numberOrder(anniversary.d)}` : null;

  return (
    <ProfileBadge
      condition={anniversary !== null}
      title="Anniversary"
      description={(
        <span>
          This user is {sign && vowelStart(sign) ? 'an' : 'a'} <C.COLD>{sign}</C.COLD> <Zodiac fill={colors.cold} date={anniversary!} size={13} />
          <br/>
          Their anniversary is on <C.SECONDARY><RI>{date}</RI></C.SECONDARY>.
        </span>
      )}
    >
      <Zodiac
        fill={colors.cold}
        date={anniversary!}
      />
    </ProfileBadge>
  );
}

export function Bio(props:BioProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className={`${styles.bio} ${expanded ? styles.expanded : ""}`}>
      <span {...focusable("", () => setExpanded(e => !e))}>
        {props.content}
      </span>
      <div className={styles.badgeShelf}>
        <GenderBadge gender={props.gender} />
        <ZodiacBadge anniversary={props.anniversary} />
      </div>
    </div>
  );
}
