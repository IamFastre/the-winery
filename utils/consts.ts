import { version } from '@/package.json';

const consts = {
  version,
  name: "The Winery",
  shortname: "Winery",
  userlabel: "Winer",
} as const;

export const options = {
  feed: {
    "sort-by": ['default', 'new', 'random'] as const
  }
};

export default consts;