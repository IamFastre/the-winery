import { visit } from "unist-util-visit";

function makeTag(tag:string, prefix:string, type:string) {
  const t = tag.split(':')[1];

  return {
    type,
    data: { hName: 'span', hProperties: { class: type, 'data-tag': t } },
    children: [
      { value: `${prefix}:`, type: 'text' },
      {
        type: 'link',
        url: `/${prefix}/${t}`,
        children: [{ value: t, type: 'text' }],
      }
    ]
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function visitTag(tree:any, tagType:string, prefix:string, patternString:string) {
  const pattern = new RegExp(`\\b${prefix}:${patternString}\\b`, 'gi');

  visit(tree, ['text'], (node, i, parent) => {
    const value = node.value as string;

    if (pattern.test(value) && parent.type !== tagType) {
      const splits = value.split(pattern);
      const matches = [...value.match(pattern)!];
      const texts = splits.map(value => ({ value, type: 'text' }));
      const children = [];

      for (let i = 0; i < texts.length; i++) {
        children.push(texts[i]);

        if (i !== texts.length - 1) {
          const newNode = makeTag(matches[i], prefix, tagType);
          children.push(newNode);
        }
      }

      parent.children.splice(i, 1, ...children);
    }
  });
}

const USER_TAG = "user-tag";
const CARD_TAG = "card-tag";

// I hate this as much as the next guy but
// there's nothing we can do about it 🇫🇷
export default function tags() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree:any) => {
    visitTag(tree, USER_TAG, "u", "(?![0-9-])[a-z0-9_-]+");
    visitTag(tree, CARD_TAG, "c", "[0-9]+");

    visit(tree, ['link'], (node, i, parent) => {
      if (URL.canParse(node.url) && parent.type !== CARD_TAG) {
        const url = new URL(node.url);

        /* ============================ User Link =========================== */

        if (url.origin === location.origin && /^\/u\/[a-z0-9_-]+$/i.test(url.pathname)) {
          parent.children.splice(i, 1, makeTag(
            url.pathname.replace('/u/', ''),
            "u",
            USER_TAG
          ));
        }

        /* ============================ Card Link =========================== */

        if (url.origin === location.origin && /^\/c\/\d+$/i.test(url.pathname)) {
          parent.children.splice(i, 1, makeTag(
            url.pathname.replace('/c/', ''),
            "c",
            CARD_TAG
          ));
        }
      }
    });
  };
}
