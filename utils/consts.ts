import project from '@/package.json';
import { StorageEntry } from './types';

const consts = {
  version: project.version,
  name: "The Winery",
  shortname: "Winery",
  userlabel: "Winer",
  organization: "neRIA",
} as const;

export const options = {
  feed: {
    "sort-by": ['default', 'latest', 'random'],
  },
  settings: {
    "theme": ['tuii', 'scarlatta', 'tundra'],
    "theme-variants": {
      'tuii': ['dark', 'light'],
      'scarlatta': ['none'], //['wine', 'rose'],
      'tundra': ['none'], //['lux', 'nox'],
    },
  }
} as const;

export const storage_defaults:StorageEntry = {
  "feed:only-following": false,
  "feed:sort-by": 'default',

  "settings:theme": 'tuii',
  "settings:theme-variant": 'dark',
  "settings:goto-delay": true,
} as const;

export default consts;