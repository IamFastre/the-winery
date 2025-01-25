import project from '@/package.json';

const consts = {
  version: project.version,
  name: "The Winery",
  shortname: "Winery",
  userlabel: "Winer",
  organization: "neRIA",
} as const;

export const options = {
  feed: {
    "sort-by": ['default', 'latest', 'random']
  },
  settings: {
    "theme": ['dark', 'light', 'scarlatta'],
  }
} as const;

export default consts;