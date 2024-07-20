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
       : kind === "brand outline"
       ? NDCBO
       : kind === "mono outline"
       ? NDCMO
       : kind === "touch"
       ? NDCTI
       : NDC;
}

export function humanizeTime(stamp: number | string, noTime?:boolean) : string {
  const now  = new Date();
  const date = new Date(stamp);
  const mmnt = moment(date);

  let dif = now.getDate() - date.getDate();
  let mif = now.getMonth() - date.getMonth();

  let day = now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth()
          ? (dif === 0 ? "today" : dif === 1 ? "yesterday" : `${dif} days ago`)
          : now.getFullYear() === date.getFullYear()
          ? (mif === 1 ? `${date.getDate()}th of last month` : `${mmnt.format("DD/MM")} this year`)
          : mmnt.format("DD/MM/YYYY");

  day = (date.valueOf() > now.valueOf() ? "the future " : "") + day;
  return day + (noTime ? "" : `, at ${mmnt.format("h:mma")}`);
}

export function cropAvatar(base64Image:string, onDone:(dataUrl:string) => void, sharpen:boolean = false) {
  const WIDTH = 256, HEIGHT = 256;
  const image = document.createElement("img");
  image.src = base64Image;

  image.onload = e => {
    let w = 0, h = 0;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    if (sharpen)
      ctx.imageSmoothingEnabled = false;

    if (image.width > image.height)
      w = image.width * (canvas.height/image.height), h = canvas.height;
    else if (image.width < image.height)
      w = canvas.width, h = image.height * (canvas.width/image.width);
    else
      w = canvas.width, h = canvas.height;

    ctx.drawImage(image, -(w - canvas.width)/2, -(h - canvas.height)/2, w, h);

    onDone(ctx.canvas.toDataURL('image/png'));
  };
}
