import { getLogo, LogoKind } from '@/utils';
import { getCurrentURL } from '@/utils/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const variant = params.get('variant') as LogoKind | null;
  const logo = getLogo(variant ?? 'main');
  const url = await getCurrentURL();
  const blob = await (await fetch(`${url}${logo.src}`)).arrayBuffer();

  const headers = new Headers();
  headers.set("Content-Type", "image/png");

  return new NextResponse(blob, { status: 200, statusText: 'OK', headers });
}
