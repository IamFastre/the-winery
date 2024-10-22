import { NextResponse } from 'next/server';
import type { Endpoints, ErrorAPI, Result } from '.';

export function result<T>(data:T | null, error:Error | ErrorAPI | null) : Result<T> {
  return { data, error: JSON.parse(JSON.stringify(error)) } as Result<T>;
}

/* ========================================================================== */

export function success<T>(output:T, headers:Headers, stringify:boolean = true) {
  return new NextResponse<typeof output>(
    stringify ? JSON.stringify(output) : output as BodyInit, {
      headers,
      status: 200,
      statusText: 'OK',
    },
  );
}

export function error(status:number, statusText:string, apiError:ErrorAPI) {
  return new NextResponse<ErrorAPI>(
    JSON.stringify(apiError), {
      status,
      statusText,
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    },
  );
}

export function notFound(err:ErrorAPI) {
  return error(404, 'Not Found', err);
}

export function badRequest(message:string, details:string | null = null, hint:string | null = null) {
  return error(400, 'Bad Request', { code: 400, details, hint, message });
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
