import moment from "moment";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { GiToaster } from "react-icons/gi";
import { PiWineDuotone } from "react-icons/pi";

import consts from "@/utils/consts";
import { getZodiacString, numberOrder, vowelStart } from "@/utils";
import { UserInfo } from "@/utils/api/user/info";
import { C, RI } from "@/components/C";
import { Zodiac } from "@/components/Zodiac";
import { ProfileBadge } from "@/components/ProfileBadge";

import { BioText } from "./client";
import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";

function CheersDayBadge({ createdAt }:{ createdAt:UserInfo['created_at'] }) {
  const nowDate = moment();
  const createdDate = moment(createdAt);
  const age = Math.floor(nowDate.year() - createdDate.year());

  return (
    <ProfileBadge
      condition={nowDate.month() === createdDate.month() && nowDate.date() === createdDate.date() && age > 0}
      title="Cheers Day!"
      description={(
        <span>
          Today is this user's <C.WINE>Cheers Day</C.WINE>!
          <br/>
          They joined <C.HIGHLIGHT>{consts.name}</C.HIGHLIGHT> {age} year{age > 1 ? 's' : ''} ago.
        </span>
      )}
    >
      <PiWineDuotone
        size={30}
        color={colors.wine}
        className={styles.cheers}
      />
    </ProfileBadge>
  );
}

function GenderBadge({ gender }:{ gender:UserInfo['gender'] }) {
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

function ZodiacBadge({ anniversary }:{ anniversary:UserInfo['anniversary'] }) {
  const nowDate = moment();
  const sign = anniversary ? getZodiacString(anniversary.d, anniversary.m) : null;
  const date = anniversary ? `${moment.months(anniversary.m - 1)} ${numberOrder(anniversary.d)}` : null;
  const bdToday = nowDate.month() + 1 === anniversary?.m && nowDate.date() === anniversary.d;

  return (
    <ProfileBadge
      condition={anniversary !== null}
      title="Anniversary"
      description={(
        <span>
          This user is {sign && vowelStart(sign) ? 'an' : 'a'}
          {' '}
          <span className={bdToday ? styles.bdToday : undefined}>
            <C.COLD>
              {sign}
            </C.COLD>
            {' '}
            <Zodiac
              fill={colors.cold}
              date={anniversary!}
              size={13}
            />
          </span>
          <br/>
          Their anniversary is on <C.SECONDARY><RI>{date}</RI></C.SECONDARY>.
          {
            bdToday &&
            <>
              <br/>
              <C.SECONDARY style={{ fontSize: 'smaller' }}>
                <RI>
                  And that happens to be today!! Wish them a happy birthday!
                </RI>
              </C.SECONDARY>
            </>
          }
        </span>
      )}
    >
      <Zodiac
        fill={colors.cold}
        date={anniversary!}
        className={bdToday ? styles.bdToday : undefined}
      />
    </ProfileBadge>
  );
}

export function Bio({ info }:{ info:UserInfo }) {
  return (
    <div className={styles.bio}>
      <BioText content={info.bio} />
      <div className={styles.badgeShelf}>
        <CheersDayBadge createdAt={info.created_at} />
        <GenderBadge gender={info.gender} />
        <ZodiacBadge anniversary={info.anniversary} />
      </div>
    </div>
  );
}
