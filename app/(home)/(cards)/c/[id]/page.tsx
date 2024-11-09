import { IoCloseCircle } from "react-icons/io5";
import Image from "next/image";

import { Section } from "@/components/Section";
import { MarkDown } from "@/components/MarkDown";
import { UsernameHandle } from "@/components/UsernameHandle";
import { HydratedTime } from "@/components/HydratedTime";
import { PostButtons } from "@/components/PostButtons";
import { Header } from "@/components/Header";
import { getCardPost } from "@/utils/api/card/post";
import { getUserInfo } from "@/utils/api/user/info";

import { BackButton } from "../../client";
import styles from "./styles.module.scss";
import { CardPageShortcuts } from "./shortcuts";

interface CardPageProps {
  params: { id: string }
}

export default async function CardPage({ params }:CardPageProps) {
  const id = Number.parseInt(params.id);
  const { data:post, error:postError } = await getCardPost(id);
  const { data:author, error:userError } = await getUserInfo('id', post?.author_uuid);

  if (Number.isNaN(id)) {
    return (
      <Section style={{ flex: 1 }}>
        <div className={styles.error}>
          <IoCloseCircle />
          <span>
            Invalid post id; should be a number.
            <br/>
            <span>
              What's even this: {params.id}
            </span>
          </span>
        </div>
      </Section>
    );
  } else if (postError) {
    return (
      <Section style={{ flex: 1 }}>
        <div className={styles.error}>
          <IoCloseCircle />
          <span>
            No post with such id was found.
            <br/>
            <span>
              ID: {params.id}
            </span>
          </span>
        </div>
      </Section>
    );
  } else if (userError) {
    return (
      <Section style={{ flex: 1 }}>
        <div className={styles.error}>
          <IoCloseCircle />
          <span>
            An error happened trying to fetch author.
            <br/>
            <span>
              Author: {post.id}
            </span>
          </span>
        </div>
      </Section>
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <Header
        title="Card"
        left={<BackButton />}
        noBrackets
      />
      <Section
        containerClassName={styles.sectionContent}
        style={{ flex: 1 }}
      >
        <div className={styles.cardContent}>
          {
            post.title &&
            <div className={styles.cardTitle}>
              <h1>{post.title}</h1>
              <hr/>
            </div>
          }
          <MarkDown>
            {post.content}
          </MarkDown>
          <hr/>
          <div className={styles.footer}>
            <Image
              src={author.avatar}
              alt={`${author.username}'s avatar`}
              width={50}
              height={50}
            />
            <div className={styles.authorText}>
              <UsernameHandle username={author.username} id="user-post" />
              <HydratedTime timestamp={post.timestamp} />
            </div>
            <div className={styles.footerEnd}>
              <div className={styles.buttons}>
                <div>
                  <PostButtons postId={post.id} postTitle={post.title} postContent={post.content} showShare showOptions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <CardPageShortcuts />
    </div>
  );
}
