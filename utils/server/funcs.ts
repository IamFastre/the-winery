"use server";
import sharp from "sharp";
import { api } from "@/utils";

async function httpURLToBase64(httpURL:string) {
  return (await fetch(httpURL)).arrayBuffer();
}

function dataURLToBase64(dataURL:string) {
  return dataURL.split(';base64,').pop()!;
}

function bufferToDataURL(buffer:Buffer, extension:string = 'png') {
  return `data:image/${extension};base64,${buffer.toString('base64')}`;
}

/* ========================================================================== */
/*                                 End Points                                 */
/* ========================================================================== */

export async function getAvatarUrl(username:string) {
  const color = [
    "d71e1e", // 01
    "2054ff", // 02
    "3a7aff", // 03
    "27d4ff", // 04
    "dbb024", // 05
    "1ed760", // 06
    "8400ff", // 07
    "ff511c", // 08
    "00c43b", // 09
    "eb16c7", // 10
    "a4d904", // 11
    "f09763", // 12
  ];

  const bgColor = [
    "1f0303", // 01
    "020a26", // 02
    "010e29", // 03
    "021f26", // 04
    "241b00", // 05
    "011c0a", // 06
    "110121", // 07
    "ff511c", // 08
    "011c09", // 09
    "2b0024", // 10
    "202b00", // 11
    "2b1000", // 12
  ];

  return `https://api.dicebear.com/9.x/identicon/png?seed=${username}&rowColor=${color}&backgroundColor=${bgColor}&size=256`;
}

export async function cropAvatar(base64Image:string, sharpen:boolean = false) {
  const WIDTH = 256, HEIGHT = 256;
  const uri = dataURLToBase64(base64Image);
  const buffer = Buffer.from(uri, 'base64');

  try {
    const resizedImage = await sharp(buffer)
      .png({ compressionLevel: 9, effort: 10 })
      .resize({ width: WIDTH, height: HEIGHT, fit: 'cover', kernel: sharpen ? 'nearest' : 'lanczos3' })
      .toBuffer();

    return bufferToDataURL(resizedImage);
  }
  catch { return null; }
}

export async function getCurrentURL(trailingSlash:boolean = false) {
  let url = process?.env?.VERCEL_PROJECT_PRODUCTION_URL ?? 'http://localhost:3000';
  url = url.includes('http://') ? url : `https://${url}`;

  if (trailingSlash)
    url = url.endsWith('/') ? url : `${url}/`;
  else while (url.endsWith('/'))
    url = url.slice(0, -1);

  return url;
}

async function getLogo() {
  const res = await api('/other/logo', { variant: 'brand-outline' });
  return res;
}

export async function addLogoBadge(input:string) {
  const IMAGE_DIM   = 256,
        BADGE_DIM   = 145,
        SMASK_DIM   = 160,
        FULL_DIM    = IMAGE_DIM + Math.floor(BADGE_DIM / 2),
        MASK_OFFSET = FULL_DIM - SMASK_DIM + Math.floor((SMASK_DIM - BADGE_DIM) / 2),
        ICON_OFFSET = FULL_DIM - BADGE_DIM;

  try {
    const background = Buffer.from(`<svg><rect x="0" y="0" width="${FULL_DIM}" height="${FULL_DIM}" fill="transparent" stroke="transparent"/></svg>`);
    const bigMask = Buffer.from(`<svg><rect x="0" y="0" width="${IMAGE_DIM}" height="${IMAGE_DIM}" rx="${IMAGE_DIM/4}" ry="${IMAGE_DIM/4}"/></svg>`);
    const smallMask = Buffer.from(`<svg><rect x="0" y="0" width="${SMASK_DIM}" height="${SMASK_DIM}" rx="${SMASK_DIM/2}" ry="${SMASK_DIM/2}"/></svg>`);
    const avatar = input.startsWith("data:")
                 ? Buffer.from(dataURLToBase64(input), 'base64')
                 : input.startsWith("http:") || input.startsWith("https:")
                 ? Buffer.from(await httpURLToBase64(input))
                 : "unknown";

    if (avatar === "unknown")
      throw new TypeError(`Input not recognized as data or http url: '${input}'`);

    const icon = await sharp(await getLogo())
      .resize({ width: BADGE_DIM, height: BADGE_DIM })
      .toBuffer();

    const result = await sharp(background)
      .composite([
        { input: avatar },
        { input: bigMask, blend: 'dest-in' },
        { input: smallMask, top: MASK_OFFSET, left: MASK_OFFSET, blend: 'dest-out' },
        { input: icon, top: ICON_OFFSET, left: ICON_OFFSET },
      ])
      .toBuffer();

    return bufferToDataURL(result);
  } catch (error) {
    console.error(error);
    return null;
  }
}
