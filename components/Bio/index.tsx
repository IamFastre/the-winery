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

const Note = ({ children }:{ children:React.ReactNode }) => (
  <>
    <br/>
    <C.SECONDARY style={{ display: 'inline-block', fontSize: 'smaller', marginTop: '7.5px' }}>
      <RI>
        {children}
      </RI>
    </C.SECONDARY>
  </>
);

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
  const nowDate = moment();
  const Icon = gender === 'male' ? IoMdMale : gender === 'female' ? IoMdFemale : GiToaster;
  const color = gender === 'male' ? colors.cyan : gender === 'female' ? colors.magenta : colors.yellow;

  const fDay = nowDate.month() + 1 === 3 && nowDate.date() === 8;
  const mDay = nowDate.month() + 1 === 11 && nowDate.date() === 19;
  const tDay = nowDate.month() + 1 === 2 && nowDate.date() === nowDate.clone().month(1).endOf('month').day(4).date();

  const effect = fDay && gender === 'female'
               ? styles.fDay
               : mDay && gender === 'male'
               ? styles.mDay
               : tDay && gender === 'toaster'
               ? styles.tDay
               : undefined;

  return (
    <ProfileBadge
      condition={gender !== null}
      title="Gender"
      description={(
        <span>
          This user is a
          {' '}
          <span className={effect} style={{ color }}>
            {gender}
            {' '}
            <Icon size={15} color={color} />
          </span>
          {
            gender === 'toaster' &&
            <Note>
              We advise against taking a bath with them.
            </Note>
          }
          {
            gender === 'female' && fDay &&
            <Note>
              Today is
              {' '}
              <a style={{ opacity: 0.75 }} href="https://en.wikipedia.org/wiki/International_Women%27s_Day" target="_blank">
              International Women's Day
              </a>
              .
              <br/>
              Show her your appreciation.
            </Note>
          }
          {
            gender === 'male' && mDay &&
            <Note>
              Today is
              {' '}
              <a style={{ opacity: 0.75 }} href="https://en.wikipedia.org/wiki/International_Men%27s_Day" target="_blank">
              International Men's Day
              </a>
              .
              <br/>
              Show him your appreciation.
            </Note>
          }
          {
            gender === 'toaster' && tDay &&
            <Note>
              Today is
              {' '}
              <a style={{ opacity: 0.75 }} href="https://www.nationaldaycalendar.com/national-day/national-toast-day-last-day-in-february" target="_blank">
              National Toast Day
              </a>
              .
              <br/>
              Show them your appreciation.
            </Note>
          }
        </span>
      )}
    >
      <Icon
        size={30}
        color={color}
        className={effect}
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
          { bdToday && <Note>And that happens to be today!! Wish them a happy birthday!</Note> }
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
