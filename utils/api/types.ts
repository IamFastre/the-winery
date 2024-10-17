import type { UserInfo, UserInfoParams } from "@/app/api/user/info/route";
import type { UserSaves, UserSavesParams } from "@/app/api/user/saves/route";
import type { UserDrafts, UserDraftsParams } from "@/app/api/user/drafts/route";

import type { CardFeed, CardFeedParams } from "@/app/api/card/feed/route";
import type { CardPost, CardPostParams } from "@/app/api/card/post/route";
import type { CardDraft, CardDraftParams } from "@/app/api/card/draft/route";

import type { OtherLogo, OtherLogoParams } from "@/app/api/other/logo/route";

interface Endpoint<A,R> {
  Arguments: A;
  Return: R;
}

export interface ErrorAPI {
  code:number | string;
  message:string;
  details:string | null;
  hint:string | null;
}

export interface Endpoints {
  "/user/info":   Endpoint<UserInfoParams,   UserInfo>,
  "/user/drafts": Endpoint<UserDraftsParams, UserDrafts>,
  "/user/saves":  Endpoint<UserSavesParams,  UserSaves>,

  "/card/feed":      Endpoint<CardFeedParams,     CardFeed>,
  "/card/post":      Endpoint<CardPostParams,     CardPost>,
  "/card/draft":     Endpoint<CardDraftParams,    CardDraft>,
  // "/card/like-list": Endpoint<CardLikeListParams, CardLikeList>,
  // "/card/buttons":   Endpoint<CardButtonsParams,  CardButtons>,

  "/other/logo": Endpoint<OtherLogoParams, OtherLogo>,
}

export interface ResultSuccess<T> {
  data: T;
  error: null;
}

export interface ResultFailure {
  data: null;
  error: ErrorAPI;
}

export type Result<T> = T extends null ? ResultFailure : ResultSuccess<T>;
