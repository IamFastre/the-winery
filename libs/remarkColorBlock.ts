import { hexInvert, rgbToHex } from "@/utils";
import { visit } from "unist-util-visit";

export default function colorBlock() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree:any) => {
    visit(tree, ['inlineCode'], (node, i, parent) => {
      const value = node.value as string;

      if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value) || /^rgb|RGB\((\d{1,3}), *(\d{1,3}), *(\d{1,3})\)$/.test(value)) {
        const color = hexInvert(value.includes('#') ? value : rgbToHex(value), true);
        const rules = [
          `color: ${color};`,
          `background-color: ${value};`,
          `font-weight: bold;`,
        ];
  
        parent.children.splice(i, 1, {
          type: 'inlineCode',
          value,
          data: { hProperties: { style: rules.join(' ') } }
        });
      }
    });
  };
}
