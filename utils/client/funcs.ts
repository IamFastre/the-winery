/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Endpoints, ResultAPI, ErrorAPI } from '@/utils';

export async function api<T extends keyof Endpoints>(path:T, args?:Endpoints[T]['Arguments']) : Promise<ResultAPI<T>> {
  const isPost = path.includes('/mut/');
  const fullPath = `${location.origin}/api/${path.startsWith("/") ? path : '/' + path}`;
  const url = new URL(fullPath);

  if (args && !isPost)
    Object.keys(args).forEach(key => url.searchParams.set(key, (args)[key as keyof Endpoints[T]['Arguments']] as string));

  const response = isPost
    ? await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args)
    })
    : await fetch(url, {
      method: 'GET'
    });
  
  const json = await response.json() as Endpoints[T]['Return'] | ErrorAPI;

  return (response.ok)
    ? { data: json, error: null } as ResultAPI<T>
    : { data: null, error: json } as ResultAPI<T>;
}

export function cropAvatar(base64Image:string, onDone:(dataUrl:string) => void, sharpen:boolean = false) {
  const WIDTH = 256, HEIGHT = 256;
  const image = document.createElement("img");
  image.src = base64Image;

  image.onload = () => {
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

export function routerCanGoBack() {
  return window && window.history.length > 1 && document.referrer.includes(location.origin);
}
