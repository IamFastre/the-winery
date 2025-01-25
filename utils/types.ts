import type { UserInfo, UserInfoParams } from "@/utils/api/user/info";
import type { UserSaves, UserSavesParams } from "@/utils/api/user/saves";
import type { UserPosts, UserPostsParams } from "@/utils/api/user/posts";
import type { UserDrafts, UserDraftsParams } from "@/utils/api/user/drafts";
import type { UserSearch, UserSearchParams } from "@/utils/api/user/search";
import type { UserSuperLikeStatus, UserSuperLikeStatusParams } from "@/utils/api/user/super-like-status";

import type { CardFeed, CardFeedParams } from "@/utils/api/card/feed";
import type { CardPost, CardPostParams } from "@/utils/api/card/post";
import type { CardDraft, CardDraftParams } from "@/utils/api/card/draft";
import type { CardLikeList, CardLikeListParams } from "@/utils/api/card/like-list";
import type { CardInteractions, CardInteractionsParams } from "@/utils/api/card/interactions";

import type { OtherLogo, OtherLogoParams } from "@/utils/api/other/logo";

import type { CardSuperLike, CardSuperLikeParams } from "@/utils/api/mut/card/super-like";
import type { CardDelete, CardDeleteParams } from "@/utils/api/mut/card/delete";

import type { Theme } from "@/styles/themes/types";

import type { options } from "./consts";

export type LogoKind = "main" | "basic" | "mono" | "touch" | "old";

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
  /* ============================= Data Fetching ============================ */

  "/user/info":              Endpoint<UserInfoParams,            UserInfo>,
  "/user/posts":             Endpoint<UserPostsParams,           UserPosts>,
  "/user/drafts":            Endpoint<UserDraftsParams,          UserDrafts>,
  "/user/saves":             Endpoint<UserSavesParams,           UserSaves>,
  "/user/search":            Endpoint<UserSearchParams,          UserSearch>,
  "/user/super-like-status": Endpoint<UserSuperLikeStatusParams, UserSuperLikeStatus>,

  "/card/feed":              Endpoint<CardFeedParams,            CardFeed>,
  "/card/post":              Endpoint<CardPostParams,            CardPost>,
  "/card/draft":             Endpoint<CardDraftParams,           CardDraft>,
  "/card/like-list":         Endpoint<CardLikeListParams,        CardLikeList>,
  "/card/interactions":      Endpoint<CardInteractionsParams,    CardInteractions>,

  "/other/logo":             Endpoint<OtherLogoParams,           OtherLogo>,

  /* ============================= Data Mutation ============================ */

  "/mut/card/super-like":    Endpoint<CardSuperLikeParams, CardSuperLike>,
  "/mut/card/delete":        Endpoint<CardDeleteParams, CardDelete>,
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

/* ========================================================================== */

export type AppOptions = typeof options;

export type StorageEntry = {
  "feed:sort-by": AppOptions['feed']['sort-by'][number];
  "feed:only-following": boolean;

  "settings:theme": Theme['name'];
  "settings:goto-delay": boolean;
};
