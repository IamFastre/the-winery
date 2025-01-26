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
    "theme": ['dark', 'light', 'scarlatta'],
  }
} as const;

export const storage_defaults:StorageEntry = {
  "feed:only-following": false,
  "feed:sort-by": 'default',

  "settings:theme": 'dark',
  "settings:goto-delay": true,
} as const;

export default consts;