create table "public"."drafts" (
    "id" bigint generated by default as identity not null,
    "title" text,
    "content" text not null,
    "timestamp" timestamp with time zone not null default now(),
    "author_uuid" uuid not null
);


alter table "public"."drafts" enable row level security;

create table "public"."likes" (
    "post" bigint generated by default as identity not null,
    "timestamp" timestamp with time zone not null default now(),
    "user_uuid" uuid not null default auth.uid(),
    "id" text not null default ''::text
);


alter table "public"."likes" enable row level security;

create table "public"."posts" (
    "id" bigint generated by default as identity not null,
    "title" text,
    "content" text not null,
    "timestamp" timestamp with time zone not null default now(),
    "author_uuid" uuid
);


alter table "public"."posts" enable row level security;

create table "public"."profiles" (
    "username" text not null,
    "avatar" text not null,
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "bio" text not null default ''::text,
    "display_name" text
);


alter table "public"."profiles" enable row level security;

create table "public"."saves" (
    "post" bigint generated by default as identity not null,
    "timestamp" timestamp with time zone not null default now(),
    "user_uuid" uuid not null default auth.uid(),
    "id" text not null default ''::text
);


alter table "public"."saves" enable row level security;

create table "public"."super_likes" (
    "post" bigint generated by default as identity not null,
    "timestamp" timestamp with time zone not null default now(),
    "id" text not null default '''''::text'::text,
    "user_uuid" uuid not null default auth.uid(),
    "redacted" boolean not null default false
);


alter table "public"."super_likes" enable row level security;

CREATE UNIQUE INDEX drafts_pkey ON public.drafts USING btree (id);

CREATE UNIQUE INDEX likes_id_key ON public.likes USING btree (id);

CREATE UNIQUE INDEX likes_pkey ON public.likes USING btree (id);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

CREATE UNIQUE INDEX profiles_id_key ON public.profiles USING btree (id);

CREATE UNIQUE INDEX saves_id_key ON public.saves USING btree (id);

CREATE UNIQUE INDEX saves_pkey ON public.saves USING btree (id);

CREATE UNIQUE INDEX super_likes_id_key ON public.super_likes USING btree (id);

CREATE UNIQUE INDEX super_likes_pkey ON public.super_likes USING btree (id);

CREATE UNIQUE INDEX users_username_key ON public.profiles USING btree (username);

alter table "public"."drafts" add constraint "drafts_pkey" PRIMARY KEY using index "drafts_pkey";

alter table "public"."likes" add constraint "likes_pkey" PRIMARY KEY using index "likes_pkey";

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

alter table "public"."saves" add constraint "saves_pkey" PRIMARY KEY using index "saves_pkey";

alter table "public"."super_likes" add constraint "super_likes_pkey" PRIMARY KEY using index "super_likes_pkey";

alter table "public"."drafts" add constraint "drafts_author_uuid_fkey" FOREIGN KEY (author_uuid) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."drafts" validate constraint "drafts_author_uuid_fkey";

alter table "public"."drafts" add constraint "drafts_content_check" CHECK ((length(content) >= 8)) not valid;

alter table "public"."drafts" validate constraint "drafts_content_check";

alter table "public"."likes" add constraint "likes_id_key" UNIQUE using index "likes_id_key";

alter table "public"."likes" add constraint "likes_post_fkey" FOREIGN KEY (post) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."likes" validate constraint "likes_post_fkey";

alter table "public"."likes" add constraint "likes_user_uuid_fkey" FOREIGN KEY (user_uuid) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."likes" validate constraint "likes_user_uuid_fkey";

alter table "public"."posts" add constraint "posts_author_uuid_fkey" FOREIGN KEY (author_uuid) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."posts" validate constraint "posts_author_uuid_fkey";

alter table "public"."posts" add constraint "posts_content_check" CHECK ((length(content) >= 8)) not valid;

alter table "public"."posts" validate constraint "posts_content_check";

alter table "public"."posts" add constraint "posts_title_check" CHECK (((title IS NULL) OR (length(title) >= 3))) not valid;

alter table "public"."posts" validate constraint "posts_title_check";

alter table "public"."profiles" add constraint "profiles_id_key" UNIQUE using index "profiles_id_key";

alter table "public"."profiles" add constraint "users_bio_check" CHECK ((length(bio) <= 256)) not valid;

alter table "public"."profiles" validate constraint "users_bio_check";

alter table "public"."profiles" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "users_id_fkey";

alter table "public"."profiles" add constraint "users_username_key" UNIQUE using index "users_username_key";

alter table "public"."saves" add constraint "saves_id_key" UNIQUE using index "saves_id_key";

alter table "public"."saves" add constraint "saves_post_fkey" FOREIGN KEY (post) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."saves" validate constraint "saves_post_fkey";

alter table "public"."saves" add constraint "saves_user_uuid_fkey" FOREIGN KEY (user_uuid) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."saves" validate constraint "saves_user_uuid_fkey";

alter table "public"."super_likes" add constraint "super_likes_id_key" UNIQUE using index "super_likes_id_key";

alter table "public"."super_likes" add constraint "super_likes_post_fkey" FOREIGN KEY (post) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."super_likes" validate constraint "super_likes_post_fkey";

alter table "public"."super_likes" add constraint "super_likes_user_uuid_fkey" FOREIGN KEY (user_uuid) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."super_likes" validate constraint "super_likes_user_uuid_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_like_when_super_like()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$begin
  if not exists (
    select 1
    from likes
    where
      post = new.post
      and
      user_uuid = new.user_uuid
  ) then
    insert into likes (post, user_uuid)
    values (new.post, new.user_uuid);
  end if;
  return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.generic_score(posts)
 RETURNS integer
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
  DECLARE
    total_score int;
    
    self    uuid;

    c_like   int;
    c_super  int;
    c_save   int;

    d_age   int;
    intrctd boolean;
  BEGIN
    self    := COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid);

    c_like   := (SELECT COUNT(*) FROM likes       WHERE post = $1.id);
    c_super  := (SELECT COUNT(*) FROM super_likes WHERE post = $1.id);
    c_save   := (SELECT COUNT(*) FROM saves       WHERE post = $1.id);

    d_age   := (to_unix(CURRENT_TIMESTAMP) - to_unix($1.timestamp) / 60 / 60 / 24);
    intrctd := (SELECT EXISTS(SELECT * FROM likes WHERE post = $1.id and user_uuid = self))  --< Post is liked >--
            or (SELECT EXISTS(SELECT * FROM saves WHERE post = $1.id and user_uuid = self)); --< Post is saved >--
    
    RETURN (c_like + c_super + c_save);
  END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$begin
    insert into profiles (id, username, avatar)
    values(
      new.id,
      new.raw_user_meta_data->>'username',
      CONCAT(
        'https://api.dicebear.com/9.x/identicon/png?seed=',
        new.raw_user_meta_data->>'username',
        '&rowColor=d71e1e,2054ff,3a7aff,27d4ff,dbb024,1ed760,8400ff,ff511c,00c43b,eb16c7,a4d904,f09763&backgroundColor=1f0303,020a26,010e29,021f26,241b00,011c0a,110121,ff511c,011c09,2b0024,202b00,2b1000&size=256'));
    return new;
  end;$function$
;

CREATE OR REPLACE FUNCTION public.is_confirmed(id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'auth'
AS $function$begin
  return (select confirmed_at from auth.users where auth.users.id = $1) is not null;
end;$function$
;

CREATE OR REPLACE FUNCTION public.remove_super_like_when_like()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$begin
    update super_likes
    set redacted = true
    where post = old.post and user_uuid = old.user_uuid;

    return old;
  end;$function$
;

CREATE OR REPLACE FUNCTION public.to_unix(stamp timestamp with time zone)
 RETURNS bigint
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
    BEGIN
    return EXTRACT(EPOCH FROM (stamp))::BIGINT;
    END;
  $function$
;

CREATE OR REPLACE FUNCTION public.user_post_link()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  begin
      new.id := new.post::text || '@' || new.user_uuid::text;
      return new;
  end;
$function$
;

grant delete on table "public"."drafts" to "anon";

grant insert on table "public"."drafts" to "anon";

grant references on table "public"."drafts" to "anon";

grant select on table "public"."drafts" to "anon";

grant trigger on table "public"."drafts" to "anon";

grant truncate on table "public"."drafts" to "anon";

grant update on table "public"."drafts" to "anon";

grant delete on table "public"."drafts" to "authenticated";

grant insert on table "public"."drafts" to "authenticated";

grant references on table "public"."drafts" to "authenticated";

grant select on table "public"."drafts" to "authenticated";

grant trigger on table "public"."drafts" to "authenticated";

grant truncate on table "public"."drafts" to "authenticated";

grant update on table "public"."drafts" to "authenticated";

grant delete on table "public"."drafts" to "service_role";

grant insert on table "public"."drafts" to "service_role";

grant references on table "public"."drafts" to "service_role";

grant select on table "public"."drafts" to "service_role";

grant trigger on table "public"."drafts" to "service_role";

grant truncate on table "public"."drafts" to "service_role";

grant update on table "public"."drafts" to "service_role";

grant delete on table "public"."likes" to "anon";

grant insert on table "public"."likes" to "anon";

grant references on table "public"."likes" to "anon";

grant select on table "public"."likes" to "anon";

grant trigger on table "public"."likes" to "anon";

grant truncate on table "public"."likes" to "anon";

grant update on table "public"."likes" to "anon";

grant delete on table "public"."likes" to "authenticated";

grant insert on table "public"."likes" to "authenticated";

grant references on table "public"."likes" to "authenticated";

grant select on table "public"."likes" to "authenticated";

grant trigger on table "public"."likes" to "authenticated";

grant truncate on table "public"."likes" to "authenticated";

grant update on table "public"."likes" to "authenticated";

grant delete on table "public"."likes" to "service_role";

grant insert on table "public"."likes" to "service_role";

grant references on table "public"."likes" to "service_role";

grant select on table "public"."likes" to "service_role";

grant trigger on table "public"."likes" to "service_role";

grant truncate on table "public"."likes" to "service_role";

grant update on table "public"."likes" to "service_role";

grant delete on table "public"."posts" to "anon";

grant insert on table "public"."posts" to "anon";

grant references on table "public"."posts" to "anon";

grant select on table "public"."posts" to "anon";

grant trigger on table "public"."posts" to "anon";

grant truncate on table "public"."posts" to "anon";

grant update on table "public"."posts" to "anon";

grant delete on table "public"."posts" to "authenticated";

grant insert on table "public"."posts" to "authenticated";

grant references on table "public"."posts" to "authenticated";

grant select on table "public"."posts" to "authenticated";

grant trigger on table "public"."posts" to "authenticated";

grant truncate on table "public"."posts" to "authenticated";

grant update on table "public"."posts" to "authenticated";

grant delete on table "public"."posts" to "service_role";

grant insert on table "public"."posts" to "service_role";

grant references on table "public"."posts" to "service_role";

grant select on table "public"."posts" to "service_role";

grant trigger on table "public"."posts" to "service_role";

grant truncate on table "public"."posts" to "service_role";

grant update on table "public"."posts" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."saves" to "anon";

grant insert on table "public"."saves" to "anon";

grant references on table "public"."saves" to "anon";

grant select on table "public"."saves" to "anon";

grant trigger on table "public"."saves" to "anon";

grant truncate on table "public"."saves" to "anon";

grant update on table "public"."saves" to "anon";

grant delete on table "public"."saves" to "authenticated";

grant insert on table "public"."saves" to "authenticated";

grant references on table "public"."saves" to "authenticated";

grant select on table "public"."saves" to "authenticated";

grant trigger on table "public"."saves" to "authenticated";

grant truncate on table "public"."saves" to "authenticated";

grant update on table "public"."saves" to "authenticated";

grant delete on table "public"."saves" to "service_role";

grant insert on table "public"."saves" to "service_role";

grant references on table "public"."saves" to "service_role";

grant select on table "public"."saves" to "service_role";

grant trigger on table "public"."saves" to "service_role";

grant truncate on table "public"."saves" to "service_role";

grant update on table "public"."saves" to "service_role";

grant delete on table "public"."super_likes" to "anon";

grant insert on table "public"."super_likes" to "anon";

grant references on table "public"."super_likes" to "anon";

grant select on table "public"."super_likes" to "anon";

grant trigger on table "public"."super_likes" to "anon";

grant truncate on table "public"."super_likes" to "anon";

grant update on table "public"."super_likes" to "anon";

grant delete on table "public"."super_likes" to "authenticated";

grant insert on table "public"."super_likes" to "authenticated";

grant references on table "public"."super_likes" to "authenticated";

grant select on table "public"."super_likes" to "authenticated";

grant trigger on table "public"."super_likes" to "authenticated";

grant truncate on table "public"."super_likes" to "authenticated";

grant update on table "public"."super_likes" to "authenticated";

grant delete on table "public"."super_likes" to "service_role";

grant insert on table "public"."super_likes" to "service_role";

grant references on table "public"."super_likes" to "service_role";

grant select on table "public"."super_likes" to "service_role";

grant trigger on table "public"."super_likes" to "service_role";

grant truncate on table "public"."super_likes" to "service_role";

grant update on table "public"."super_likes" to "service_role";

create policy "Allow users to access their drafts only"
on "public"."drafts"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = author_uuid))
with check ((( SELECT auth.uid() AS uid) = author_uuid));


create policy "Allow users to freely access their likes only"
on "public"."likes"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_uuid))
with check ((( SELECT auth.uid() AS uid) = user_uuid));


create policy "Users can see others' likes"
on "public"."likes"
as permissive
for select
to authenticated
using (true);


create policy "Allow users to delete their posts only"
on "public"."posts"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = author_uuid));


create policy "Allow users to insert their posts only"
on "public"."posts"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = author_uuid));


create policy "Logged users can see all posts"
on "public"."posts"
as permissive
for select
to authenticated
using (true);


create policy "Allow read for all users"
on "public"."profiles"
as permissive
for select
to authenticated
using (true);


create policy "Allow update for user-self"
on "public"."profiles"
as permissive
for update
to authenticated
using ((id = auth.uid()))
with check ((id = auth.uid()));


create policy "Allow users to access their saves only"
on "public"."saves"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_uuid))
with check ((( SELECT auth.uid() AS uid) = user_uuid));


create policy "Users can see  super likes unless it's redacted"
on "public"."super_likes"
as permissive
for select
to authenticated
using ((NOT redacted));


CREATE TRIGGER new_like BEFORE INSERT ON public.likes FOR EACH ROW EXECUTE FUNCTION user_post_link();

CREATE TRIGGER remove_super_like_when_like BEFORE DELETE ON public.likes FOR EACH ROW EXECUTE FUNCTION remove_super_like_when_like();

CREATE TRIGGER new_save BEFORE INSERT ON public.saves FOR EACH ROW EXECUTE FUNCTION user_post_link();

CREATE TRIGGER add_like_when_super_like AFTER INSERT ON public.super_likes FOR EACH ROW EXECUTE FUNCTION add_like_when_super_like();

CREATE TRIGGER new_super BEFORE INSERT ON public.super_likes FOR EACH ROW EXECUTE FUNCTION user_post_link();

