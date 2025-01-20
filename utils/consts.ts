import { version } from '@/package.json';

const consts = {
  version,
  name: "The Winery",
  shortname: "Winery",
  userlabel: "Winer",
  organization: "neRIA",
} as const;

export const options = {
  feed: {
    "sort-by": ['default', 'new', 'random'] as const
  },
  settings: {
    "theme": [
      "dark",
      "light",
      "scarlatta",
    ]
  }
};

export default consts;