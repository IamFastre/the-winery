import { visit } from "unist-util-visit";

function makeCardTag(card:number | string) {
  return {
    type: 'mention',
    data: { hName: 'span', hProperties: { class: "card-mention" } },
    children: [
      { value: 'c:', type: 'text' },
      {
        type: 'card',
        children: [{ value: card, type: 'text' }],
        data: {
          hName: 'a',
          hProperties: {
            href: `/c/${card}`,
          }
        }
      }
    ]
  }
}

// I hate this as much as the next guy but
// there's nothing we can do about it 🇫🇷
export default function cardTag() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree:any) => {
    visit(tree, ['text'], (node, i, parent) => {
      if (!/c:[0-9]+/i.test(node.value))
        return;

      const { value } = node;
      const values = value.split(" ") as string[];

      const children = values.map((str, i) => {
        if (/^c:[0-9]+$/i.test(str)) {
          const card = str.replace(/c:/i, "");
          return makeCardTag(card);
        } else {
          let value = str;

          if (values[i-1]?.includes("c:"))
            value = " " + value;
          if (i < values.length - 1)
            value = value + " ";

          return {
            value,
            type: 'text',
          };
        }
      });

      parent.children.splice(i, 1, ...children);
    });

    visit(tree, ['link'], (node, i, parent) => {
      const url = new URL(node.url);
      if (url.origin === location.origin && /^\/c\/\d+$/i.test(url.pathname)) {
        const newNode = makeCardTag(url.pathname.replace('/c/', ''));
        parent.children.splice(i, 1, newNode);
      }
    });
  };
}
