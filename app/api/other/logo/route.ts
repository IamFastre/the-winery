import { NextRequest } from 'next/server';

import { getLogo, LogoKind, success } from '@/utils';
import { getCurrentURL } from '@/utils/server';

export type OtherLogo = ArrayBuffer;
export type OtherLogoParams = { variant:LogoKind | undefined };

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const variant = params.get('variant') as OtherLogoParams['variant'];
  const logo = getLogo(variant ?? 'main');
  const url = await getCurrentURL();
  const blob = await (await fetch(`${url}${logo.src}`)).arrayBuffer();
  console.log(`${url}${logo.src}`)
  const headers = new Headers();
  headers.set("Content-Type", "image/png");

  return success(blob, headers, false);
}
