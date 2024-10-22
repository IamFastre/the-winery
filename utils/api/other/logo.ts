import { result } from '@/utils/api';
import { getLogo, LogoKind } from "@/utils";
import { getCurrentURL } from "@/utils/server";

export type OtherLogo = ArrayBuffer;
export type OtherLogoParams = { variant:LogoKind | undefined };

export async function getOtherLogo(variant:OtherLogoParams['variant']) {
  const logo = getLogo(variant ?? 'main');
  const url = await getCurrentURL();
  const res = await fetch(`${url}${logo.src}`);
  const blob = await res.arrayBuffer();

  return result<OtherLogo>(blob, null);
}