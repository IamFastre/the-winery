import { NextResponse } from 'next/server';
import type { Endpoints, ErrorAPI, Init, Result } from '.';

function error(code:number | string, message:string, details:string | null = null, hint:string | null = null) {
  return {
    code,
    details, 
    hint,
    message, 
  };
}

/* ========================================================================== */

export function result<T>(data:T | null, error:Error | ErrorAPI | null) : Result<T> {
  return { data, error: JSON.parse(JSON.stringify(error)) } as Result<T>;
}

export function success<T>(output:T, headers:Headers, stringified:boolean = true, init:Init = {}) {
  return new NextResponse<typeof output>(
    stringified ? JSON.stringify(output) : output as BodyInit, {
      headers,
      status: 200,
      statusText: 'OK',
      ...init,
    },
  );
}

export function notFound<T>(output:T, headers:Headers, stringified:boolean = true, init:Init = {}) {
  return new NextResponse<ErrorAPI>(
    typeof output === 'string'
    ? JSON.stringify(error(404, output))
    : stringified
    ? JSON.stringify(output)
    : output as BodyInit, {
      headers,
      status: 404,
      statusText: 'Not Found',
      ...init,
    },
  );
}

export function badRequest<T>(output:T, headers:Headers, stringified:boolean = true, init:Init = {}) {
  return new NextResponse<ErrorAPI>(
    typeof output === 'string'
    ? JSON.stringify(error(400, output))
    : stringified
    ? JSON.stringify(output)
    : output as BodyInit, {
      headers,
      status: 400,
      statusText: 'Bad Request',
      ...init,
    },
  );
}

/* ========================================================================== */

export async function api<T extends keyof Endpoints>(path:T, args?:Endpoints[T]['Arguments']) : Promise<Endpoints[T]['Return']> {
  const fullPath = `${location.origin}/api/${path.startsWith("/") ? path : '/' + path}`;
  const url = new URL(fullPath);
  if (args)
    Object.keys(args).forEach(key => url.searchParams.set(key, (args as any)[key]));
  const response = await fetch(url);

  return await response.json() as Endpoints[T]['Return'];
}
