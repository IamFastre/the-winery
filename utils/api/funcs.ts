import { NextResponse } from 'next/server';
import type { ErrorAPI, Result } from '@/utils';

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
