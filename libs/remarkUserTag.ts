import { visit } from "unist-util-visit";

// I hate this as much as the next guy but
// there's nothing we can do about it 🇫🇷
export default function userTag() {
  return (tree:any) => {
    visit(tree, ['text'], (node, i, parent) => {
      if (node.type !== 'text' || !/u:(?![0-9\-])[a-z0-9_-]+(?![\-])/i.test(node.value))
        return;

      const { value } = node;
      const values = value.split(" ") as string[];

      const children = values.map((str, i) => {
        if (/^u:(?![0-9\-])[a-z0-9_-]+(?![\-])$/i.test(str)) {
          const username = str.replace("u:", "");
          return {
            type: 'mention',
            data: { hName: 'span', hProperties: { class: "mention" } },
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
  };
}