import { visit } from "unist-util-visit";

function makeUserTag(username:number | string) {
  return {
    type: 'mention',
    data: { hName: 'span', hProperties: { class: "user-mention" } },
    children: [
      { value: 'u:', type: 'text' },
      {
        type: 'username',
        children: [{ value: username, type: 'text' }],
        data: {
          hName: 'a',
          hProperties: {
            href: `/u/${username}`,
          }
        }
      }
    ]
  };
}

// I hate this as much as the next guy but
// there's nothing we can do about it 🇫🇷
export default function userTag() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree:any) => {
    visit(tree, ['text'], (node, i, parent) => {
      if (!/u:(?![0-9\-])[a-z0-9_-]+(?![\-])/i.test(node.value))
        return;

      const { value } = node;
      const values = value.split(" ") as string[];

      const children = values.map((str, i) => {
        if (/^u:(?![0-9\-])[a-z0-9_-]+(?![\-])$/i.test(str)) {
          const username = str.replace(/u:/i, "");
          return makeUserTag(username);
        } else {
          let value = str;

          if (values[i-1]?.includes("u:"))
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
      if (URL.canParse(node.url)) {
        const url = new URL(node.url);
        if (url.origin === location.origin && /^\/u\/[a-z0-9_-]+$/i.test(url.pathname)) {
          const newNode = makeUserTag(url.pathname.replace('/u/', ''));
          parent.children.splice(i, 1, newNode);
        }
      }
    });
  };
}
