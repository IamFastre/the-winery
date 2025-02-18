import project from '@/package.json';
import { StorageEntry } from './types';

const consts = {
  version: project.version,
  name: process.env.NEXT_PUBLIC_PROJECT_NAME!,
  shortname: process.env.NEXT_PUBLIC_PROJECT_SHORT_NAME ?? process.env.NEXT_PUBLIC_PROJECT_NAME!,
  userlabel: process.env.NEXT_PUBLIC_PROJECT_USER_LABEL ?? 'user',
  organization: process.env.NEXT_PUBLIC_PROJECT_ORGANIZATION!,
} as const;

export const options = {
  feed: {
    "sort-by": ['default', 'latest', 'random'],
  },
  settings: {
    "theme": ['tuii', 'scarlatta', 'tundra'],
    "theme-variant": {
      'tuii': ['dark', 'light'],
      'scarlatta': ['wine', 'rose'],
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