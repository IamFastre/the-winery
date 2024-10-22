import type { UserInfo, UserInfoParams } from "@/utils/api/user/info";
import type { UserSaves, UserSavesParams } from "@/utils/api/user/saves";
import type { UserDrafts, UserDraftsParams } from "@/utils/api/user/drafts";
import type { UserSearch, UserSearchParams } from "@/utils/api/user/search";

import type { CardFeed, CardFeedParams } from "@/utils/api/card/feed";
import type { CardPost, CardPostParams } from "@/utils/api/card/post";
import type { CardDraft, CardDraftParams } from "@/utils/api/card/draft";
import type { CardLikeList, CardLikeListParams } from "@/utils/api/card/like-list";
import type { CardInteractions, CardInteractionsParams } from "@/utils/api/card/interactions";

import type { OtherLogo, OtherLogoParams } from "@/utils/api/other/logo";

export type LogoKind = "main" | "brand" | "mono" | "brand-outline" | "mono-outline" | "touch";

export interface ErrorAPI {
  code:number | string;
  message:string;
  details:string | null;
  hint:string | null;
}

export interface Endpoint<A,R> {
  Arguments: A;
  Return: R;
}

export interface Endpoints {
  "/user/info":   Endpoint<UserInfoParams,   UserInfo>,
  "/user/drafts": Endpoint<UserDraftsParams, UserDrafts>,
  "/user/saves":  Endpoint<UserSavesParams,  UserSaves>,
  "/user/search":  Endpoint<UserSearchParams,  UserSearch>,

  "/card/feed":           Endpoint<CardFeedParams,     CardFeed>,
  "/card/post":           Endpoint<CardPostParams,     CardPost>,
  "/card/draft":          Endpoint<CardDraftParams,    CardDraft>,
  "/card/like-list":      Endpoint<CardLikeListParams, CardLikeList>,
  "/card/interactions":   Endpoint<CardInteractionsParams,  CardInteractions>,

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
export type ResultAPI<T extends keyof Endpoints> = Result<Endpoints[T]['Return'] | null>;
