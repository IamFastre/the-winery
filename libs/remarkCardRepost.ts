import { visit } from "unist-util-visit";

function makeCardRepost(card:number | string) {
  return {
    type: 'repost',
    data: { hName: 'span', hProperties: { id: card, class: "card-repost" } },
  }
}


// I hate this as much as the next guy but
// there's nothing we can do about it 🇫🇷
export default function cardRepost() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree:any) => {
    visit(tree, ['paragraph'], (node, i, parent) => {
      if (node.children.length !== 1 || !/^re:[0-9]+$/i.test(node.children[0].value))
        return;

      const { value } = node.children[0];
      const values = value.split(" ") as string[];

      const children = values.map((str, i) => {
        if (/^re:[0-9]+$/i.test(str)) {
          const card = str.replace(/re:/i, "");
          return makeCardRepost(card);
        } else {
          let value = str;

          if (values[i-1]?.includes("re:"))
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
  };
}
