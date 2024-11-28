import { visit } from "unist-util-visit";
import colors from "@/styles/colors.module.scss";
import consts from "@/utils/consts";

function makeEmoticon(value:string, color:string = colors.yellow, ligatures:boolean = true) {
  return {
    type: 'emoticon',
    data: {
      hName: 'span',
      hProperties: {
        style: `color: ${color}; font-weight: bold;${ligatures ? '' : ' font-variant-ligatures: none;'}`
      }
    },
    children: [
      { value, type: 'text' },
    ]
  };
}

interface Options {
  ligatures: boolean;
  borders: [boolean, boolean];
}

const defaultOptions:Options = {
  ligatures: false,
  borders: [false, false],
}

const noBorders:Partial<Options> = { borders: [true, true] };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function visitEmoticon(tree:any, emote:string, color:string = colors.yellow, options:Partial<Options> | null = null) {
  const o:Options = { ...defaultOptions, ...options };

  const escaped = emote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `${o.borders[0] ? '' : '(?<=\\s|^)'}${escaped}${o.borders[1] ? '' : '(?=\\s|$)'}`
  );

  visit(tree, ['text'], (node, i, parent) => {
    const value = node.value as string;
    if (pattern.test(value) && parent.type !== 'emoticon') {
      const splits = value.split(emote);
      const newNode = makeEmoticon(emote, color, o.ligatures);
      const texts = splits.map(value => ({ value, type: 'text' }));
      const children = [];

      for (let i = 0; i < texts.length; i++) {
        children.push(texts[i]);
        if (i !== texts.length - 1)
          children.push(newNode);
      }

      parent.children.splice(i, 1, ...children);
    }
  });
}

// I hate this as much as the next guy but
// there's nothing we can do about it 🇫🇷
export default function emoticon() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree:any) => {
    visitEmoticon(tree, consts.name,      colors.highlight, noBorders);
    visitEmoticon(tree, consts.shortname, colors.highlight, noBorders);
    
    visitEmoticon(tree, 'John Cena', colors.none,   noBorders);
    visitEmoticon(tree, 'Kirby',     colors.pink,   noBorders);
    visitEmoticon(tree, 'Kuromi',    colors.purple, noBorders);
    visitEmoticon(tree, 'Shrek',     colors.green,  noBorders);

    visitEmoticon(tree, 'XOXO', colors.red, noBorders);
    visitEmoticon(tree, 'xoxo', colors.red, noBorders);

    visitEmoticon(tree, 'OwO', colors.magenta, noBorders);
    visitEmoticon(tree, 'owo', colors.magenta);

    visitEmoticon(tree, 'UwU', colors.magenta, noBorders);
    visitEmoticon(tree, 'uwu', colors.magenta);

    visitEmoticon(tree, 'TwT', colors.magenta, noBorders);
    visitEmoticon(tree, 'twt', colors.magenta);

    visitEmoticon(tree, '^-^', colors.yellow);

    visitEmoticon(tree, '0-0', colors.secondary);
    visitEmoticon(tree, '0_0', colors.secondary);

    visitEmoticon(tree, '•<•', colors.green);

    visitEmoticon(tree, '•-•', colors.secondary);
    visitEmoticon(tree, '.-.', colors.secondary, { ligatures: false });

    visitEmoticon(tree, '>:}', colors.highlight);
    visitEmoticon(tree, '{:<', colors.highlight);

    visitEmoticon(tree, '>:(', colors.hot);
    visitEmoticon(tree, '):<', colors.hot);

    visitEmoticon(tree, ':-(', colors.yellow);
    visitEmoticon(tree, ')-:', colors.yellow);

    visitEmoticon(tree, ':-)', colors.yellow);
    visitEmoticon(tree, '(-:', colors.yellow);

    visitEmoticon(tree, ':P', colors.yellow);
    visitEmoticon(tree, ':b', colors.yellow);
    visitEmoticon(tree, ':p', colors.yellow);
    visitEmoticon(tree, 'q:', colors.yellow);

    visitEmoticon(tree, ':o', colors.yellow);
    visitEmoticon(tree, 'o:', colors.yellow);

    visitEmoticon(tree, ':O', colors.yellow);
    visitEmoticon(tree, 'O:', colors.yellow);

    visitEmoticon(tree, 'xD', colors.yellow);

    visitEmoticon(tree, ':/', colors.secondary);
    visitEmoticon(tree, '/:', colors.secondary);

    visitEmoticon(tree, ':\\', colors.secondary);
    visitEmoticon(tree, '\\:', colors.secondary);

    visitEmoticon(tree, ':3', colors.pink);
    visitEmoticon(tree, 'Ɛ:', colors.pink);

    visitEmoticon(tree, ':D', colors.yellow);
    visitEmoticon(tree, 'D:', colors.yellow);

    visitEmoticon(tree, ';)', colors.yellow);
    visitEmoticon(tree, '(;', colors.yellow);

    visitEmoticon(tree, '=(', colors.yellow);
    visitEmoticon(tree, ')=', colors.yellow);

    visitEmoticon(tree, '=)', colors.yellow);
    visitEmoticon(tree, '(=', colors.yellow);

    visitEmoticon(tree, ':(', colors.yellow);
    visitEmoticon(tree, '):', colors.yellow);

    visitEmoticon(tree, ':)', colors.yellow);
    visitEmoticon(tree, '(:', colors.yellow);

    visitEmoticon(tree, '<3', colors.red);
  };
}