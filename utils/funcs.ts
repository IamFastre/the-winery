import moment from 'moment';
import { StaticImageData } from 'next/image';

import { LogoKind, StorageEntry } from './types';

import CVMain   from "@/public/static/images/logo/CorvinumMain.png";
import CVBasic  from "@/public/static/images/logo/CorvinumBasic.png";
import CVMono  from "@/public/static/images/logo/CorvinumMono.png";
import CVTouch from "@/public/static/images/logo/CorvinumTouch.png";
import CVOld from "@/public/static/images/logo/CorvinumOld.png";

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


function padZero(str:string, len:number = 2) : string {
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export function multiplyString(str:string, num:number) : string {
  let res = "";

  for (let i = 0; i < num; i++)
    res += str;

  return res;
}

export function vowelStart(str:string) : boolean {
  return /^[aeiou]/i.test(str);
}

export function rgbToHex(rgb:string) : string {
  const result = rgb.match(/\d+/g);

  if (!result || result.length !== 3)
    throw new Error('Invalid RGB color.');

  const [r, g, b] = result.map(Number);

  return `#${padZero(r.toString(16))}${padZero(g.toString(16))}${padZero(b.toString(16))}`;
}
export function hexInvert(hex:string, blackOrWhite:boolean = false) : string {
  if (hex.indexOf('#') === 0)
    hex = hex.slice(1);

  if (hex.length === 3)
    hex = hex[0] + hex[0]
        + hex[1] + hex[1]
        + hex[2] + hex[2];

  if (hex.length !== 6)
    throw new Error('Invalid HEX color.');

  let r:string | number = parseInt(hex.slice(0, 2), 16),
      g:string | number = parseInt(hex.slice(2, 4), 16),
      b:string | number = parseInt(hex.slice(4, 6), 16);

  if (blackOrWhite)
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#ffffff';

  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);

  return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
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
  return kind === "basic"
       ? CVBasic
       : kind === "mono"
       ? CVMono
       : kind === "touch"
       ? CVTouch
       : kind === "old"
       ? CVOld
       : CVMain;
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

export function getZodiacString(day:number, month:number) : string | null {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return 'Pisces';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return 'Capricorn';
  return null;
}

export function numberOrder(n:number) {
  const str = n.toFixed()
  const l = str[str.length - 1];
  return ([11, 12, 13].includes(n) ? `${n}th` : l === "1" ? `${n}st` : l === "2" ? `${n}nd` : l === "3" ? `${n}rd` : `${n}th`);
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
    result = `${Math.round(count / 10000)/10}T`;
  else if (count > 999_999_999)
    result = `${Math.round(count / 10000)/10}B`;
  else if (count > 999_999)
    result = `${Math.round(count / 1000)/10}M`;
  else if (count > 999)
    result = `${Math.round(count / 100)/10}K`;
  else
    result = `${count}`;

  return result;
}

export class LocalStorage {
  static set<T extends keyof StorageEntry>(key:T, value:StorageEntry[T]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T extends keyof StorageEntry>(key:T) : StorageEntry[T] | null {
    const value = localStorage.getItem(key);

    if (value === null)
      return null;

    try { return JSON.parse(value) as StorageEntry[T]; }
    catch { return null;
     }
  }

  static remove(key:keyof StorageEntry) : boolean {
    if (localStorage.getItem(key) !== null) {
      localStorage.removeItem(key);
      return true;
    }

    return false;
  }
}
