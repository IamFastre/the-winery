import moment from 'moment';
import { StaticImageData } from 'next/image';

import { LogoKind } from './types';

import NDC   from "@/public/static/images/logo/NaipeDeCopas.png";
import NDCB  from "@/public/static/images/logo/NaipeDeCopasBrand.png";
import NDCM  from "@/public/static/images/logo/NaipeDeCopasMono.png";
import NDCBO from "@/public/static/images/logo/NaipeDeCopasBrandO.png";
import NDCMO from "@/public/static/images/logo/NaipeDeCopasMonoO.png";
import NDCTI from "@/public/static/images/logo/NaipeDeCopasTouch.png";

import ZodiacAquarius    from "@/public/static/images/zodiacs/Aquarius.svg";
import ZodiacPisces      from "@/public/static/images/zodiacs/Pisces.svg";
import ZodiacAries       from "@/public/static/images/zodiacs/Aries.svg";
import ZodiacTaurus      from "@/public/static/images/zodiacs/Taurus.svg";
import ZodiacGemini      from "@/public/static/images/zodiacs/Gemini.svg";
import ZodiacCancer      from "@/public/static/images/zodiacs/Cancer.svg";
import ZodiacLeo         from "@/public/static/images/zodiacs/Leo.svg";
import ZodiacVirgo       from "@/public/static/images/zodiacs/Virgo.svg";
import ZodiacLibra       from "@/public/static/images/zodiacs/Libra.svg";
import ZodiacScorpio     from "@/public/static/images/zodiacs/Scorpio.svg";
import ZodiacSagittarius from "@/public/static/images/zodiacs/Sagittarius.svg";
import ZodiacCapricorn   from "@/public/static/images/zodiacs/Capricorn.svg";


export function multiplyString(str:string, num:number) : string {
  let res = "";

  for (let i = 0; i < num; i++)
    res += str;

  return res;
}

export function hexOpacity(str:string, opacity:number) : string {
  if (str[0] !== '#')
    throw new Error("Must be a hex color starting with '#'");

  // turn it from #xxx format to #xxxxxx
  if (str.length === 4) {
    str = `#${str[1]}${str[1]}${str[2]}${str[2]}${str[4]}${str[4]}`;
  }

  // turn it from #xxxxxxaa to #xxxxxx
  if (str.length === 9) {
    str = str.substring(0, str.length - 2);
  }

  str += Math.floor(0xff * opacity).toString(16);

  return str;
}

export function getLogo(kind:LogoKind) : StaticImageData {
  return kind === "brand"
       ? NDCB
       : kind === "mono"
       ? NDCM
       : kind === "brand-outline"
       ? NDCBO
       : kind === "mono-outline"
       ? NDCMO
       : kind === "touch"
       ? NDCTI
       : NDC;
}

export function getZodiac(day:number, month:number) : React.FC<React.SVGProps<SVGSVGElement>> | null {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return ZodiacAquarius;

  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return ZodiacPisces;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return ZodiacAries;

  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return ZodiacTaurus;

  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return ZodiacGemini;

  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return ZodiacCancer;

  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return ZodiacLeo;

  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return ZodiacVirgo;

  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return ZodiacLibra;

  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return ZodiacScorpio;

  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return ZodiacSagittarius;

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return ZodiacCapricorn;

  return null;
}

export function numberOrder(n:number) {
  const str = n.toFixed()
  const l = str[str.length - 1];
  return (l === "1" ? `${n}st` : l === "2" ? `${n}nd` : `${n}th`);
}

export function humanizeTime(stamp: number | string, utc:boolean = true, noTime:boolean = false) : string {
  const now  = utc ? moment.utc() : moment();
  const date = utc ? moment.utc(stamp) : moment(stamp);

  const dif = now.date() - date.date();
  const mif = now.month() - date.month();

  let day = now.year() === date.year() && now.month() === date.month()
          ? (dif === 0 ? "today" : dif === 1 ? "yesterday" : `${dif} days ago`)
          : now.year() === date.year()
          ? (mif === 1 ? numberOrder(date.date())
            + ` of last month` : `${date.format("DD/MM")} this year`)
          : date.format("DD/MM/YYYY");

  day = (date.valueOf() > now.valueOf() ? "the future " : "") + day;
  return day + (noTime ? "" : `, at ${date.format("h:mma")}`);
}

export function humanizeLikes(count: number) : string {
  let result = '';

  if (count > 999_999_999_999)
    result = `${Math.floor(count / 10000)/10}T`;
  else if (count > 999_999_999)
    result = `${Math.floor(count / 10000)/10}B`;
  else if (count > 999_999)
    result = `${Math.floor(count / 1000)/10}M`;
  else if (count > 999)
    result = `${Math.floor(count / 100)/10}K`;
  else
    result = `${count}`;

  return result;
}
