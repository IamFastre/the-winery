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
    "theme-variant": {
      'tuii': ['dark', 'light'],
      'scarlatta': ['none'], //['wine', 'rose'],
      'tundra': ['none'], //['lux', 'nox'],
    },
  }
} as const;

export const themes:string[] = []

Object.keys(options['settings']['theme-variant']).map((n) => {
  options['settings']['theme-variant'][n as keyof typeof options['settings']['theme-variant']].forEach(v => {
    themes.push(v === 'none' ? n : `${n}:${v}`);
  });
})

export const storage_defaults:StorageEntry = {
  "feed:only-following": false,
  "feed:sort-by": 'default',

  "settings:theme": 'tuii',
  "settings:theme-variant": 'dark',
  "settings:goto-delay": true,
} as const;

export default consts;