"use server";
import sharp from "sharp";

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

  return `https://api.dicebear.com/9.x/identicon/png?seed=${username}&rowColor=${color}&backgroundColor=${bgColor}&size=256&created=${Date.now()}`;
}

export async function cropAvatar(base64Image:string, sharpen:boolean = false) {
  const WIDTH = 256, HEIGHT = 256;
  const uri = base64Image.split(';base64,').pop()!;
  const buffer = Buffer.from(uri, 'base64');

  try {
    const resizedImage = await sharp(buffer)
      .png({ compressionLevel: 9, effort: 10 })
      .resize({ width: WIDTH, height: HEIGHT, fit: 'cover', kernel: sharpen ? 'nearest' : 'lanczos3' })
      .toBuffer();

    return "data:image/png;base64," + resizedImage.toString('base64');
  }
  catch { return null; }
}

export async function getCurrentURL(trailingSlash:boolean = false) {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000';
  url = url.startsWith('http') ? url : `https://${url}`;

  if (trailingSlash)
    url = url.endsWith('/') ? url : `${url}/`;
  else while (url.endsWith('/'))
    url = url.slice(0, -1);

  return url;
}
