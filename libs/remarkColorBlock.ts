import { visit } from "unist-util-visit";

export default function colorBlock() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree:any) => {
    visit(tree, ['inlineCode'], (node, i, parent) => {
      const value = node.value as string;

      if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value) || /^rgb|RGB\((\d{1,3}), *(\d{1,3}), *(\d{1,3})\)$/.test(value))
        parent.children.splice(i, 1, {
          type: 'inlineCode',
          value,
          data: { hProperties: { style: `background-color: ${value};` } }
        });
    });
  };
}
