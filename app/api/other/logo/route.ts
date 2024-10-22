import { NextRequest, NextResponse } from 'next/server';

import { getOtherLogo, OtherLogo, OtherLogoParams } from '@/utils/api/other/logo';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "image/png");

  const variant = (params.get('variant') ?? 'main') as OtherLogoParams['variant'];
  const res = await getOtherLogo(variant);

  return new NextResponse<OtherLogo>(
    res.data, {
      headers,
      status: 200,
      statusText: 'OK',
    },
  );
}
