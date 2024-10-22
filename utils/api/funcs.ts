import { NextResponse } from 'next/server';
import type { Endpoints, ErrorAPI, Result, ResultAPI, ResultFailure } from '.';

export function result<T>(data:T | null, error:Error | ErrorAPI | null) : Result<T> {
  return { data, error: JSON.parse(JSON.stringify(error)) } as Result<T>;
}

/* ========================================================================== */

export function success<T>(data:T, headers:Headers) {
  return new NextResponse<typeof data>(
    JSON.stringify(data), {
      headers,
      status: 200,
      statusText: 'OK',
    },
  );
}

export function failure(status:number, statusText:string, error:ErrorAPI) {
  return new NextResponse<ErrorAPI>(
    JSON.stringify(error), {
      status,
      statusText,
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    },
  );
}

export function notFound(err:ErrorAPI) {
  return failure(404, 'Not Found', err);
}

export function badRequest(message:string, details:string | null = null, hint:string | null = null) {
  return failure(400, 'Bad Request', { code: 400, details, hint, message });
}

/* ========================================================================== */

export async function api<T extends keyof Endpoints>(path:T, args?:Endpoints[T]['Arguments']) : Promise<ResultAPI<T>> {
  const fullPath = `${location.origin}/api/${path.startsWith("/") ? path : '/' + path}`;
  const url = new URL(fullPath);

  if (args)
    Object.keys(args).forEach(key => url.searchParams.set(key, (args as any)[key]));

  const response = await fetch(url);
  const json = await response.json() as Endpoints[T]['Return'] | ErrorAPI;

  if (response.status === 200)
    return {
      data: json,
      error: null,
    } as ResultAPI<T>;
  else
    return {
      data: null,
      error: json,
    } as ResultAPI<T>;
}
