import moment from 'moment';
import { StaticImageData } from 'next/image';

import { LogoKind } from './types';

import NDC   from "@/public/static/images/logo/NaipeDeCopas.png";
import NDCB  from "@/public/static/images/logo/NaipeDeCopasBrand.png";
import NDCM  from "@/public/static/images/logo/NaipeDeCopasMono.png";
import NDCBO from "@/public/static/images/logo/NaipeDeCopasBrandO.png";
import NDCMO from "@/public/static/images/logo/NaipeDeCopasMonoO.png";
import NDCTI from "@/public/static/images/logo/NaipeDeCopasTouch.png";


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

export function humanizeTime(stamp: number | string, utc:boolean = true, noTime:boolean = false) : string {
  const now  = utc ? moment.utc() : moment();
  const date = utc ? moment.utc(stamp) : moment(stamp);

  let dif = now.date() - date.date();
  let mif = now.month() - date.month();

  let day = now.year() === date.year() && now.month() === date.month()
          ? (dif === 0 ? "today" : dif === 1 ? "yesterday" : `${dif} days ago`)
          : now.year() === date.year()
          ? (mif === 1 ? (date.date() === 1 ? `${date.date()}st` : date.date() === 2 ? `${date.date()}nd` : `${date.date()}th` )
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
