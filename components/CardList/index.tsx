import Link from "next/link";
import { IoFolderOpenOutline } from "@icons/io5/IoFolderOpenOutline";

import { CardDraft } from "@/utils/api/card/draft";
import { CardPost } from "@/utils/api/card/post";
import { UserInfo } from "@/utils/api/user/info";
import { Card } from "@/components/Card";

import styles from "./style.module.scss";

type CardListProps = {
  cards: CardPost[];
  users?: { [id:UserInfo['id']]: UserInfo };
  type: 'posts';
} | {
  cards: CardDraft[];
  type: 'drafts';
};

export function CardList(props:CardListProps) {
  const type = props.type;
  const cards = props.cards;
  const users = type === 'posts' ? props.users : undefined;

  return (
    <div className={styles.cardArea}>
      <div className={styles.cardsHolder}>
        {
          cards.length ?
          <div className={styles.cards}>
            {
              users ?
              cards.map(card => (
                <Card
                  username={users[card.author_uuid!].username}
                  userAvatar={users[card.author_uuid!].avatar}
                  title={card.title}
                  content={card.content}
                  timestamp={card.timestamp}
                  postId={type === 'posts' ? card.id : undefined}
                  key={card.id}
                  centered
                />
                )
              )
              : type === 'posts' ?
              cards.map(card => (
                <Card
                  title={card.title}
                  content={card.content}
                  timestamp={card.timestamp}
                  postId={card.id}
                  key={card.id}
                  centered
                />
                )
              )
              :
              cards.map(card => (
                <Link
                  href={`/compose?draft=${card.id}`}
                  type="wrapper"
                  key={card.id}
                >
                  <Card
                    title={card.title}
                    content={card.content}
                    timestamp={card.timestamp}
                    centered
                  />
                </Link>
                )
              )
            }
          </div>
        :
        <div className={styles.noCards}>
          <IoFolderOpenOutline />
          <span>
            No posts yet
          </span>
        </div>
        }
      </div>
    </div>
  );
}
