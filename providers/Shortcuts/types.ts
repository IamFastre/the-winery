interface BaseShortcut {
  key:string;
  alt?:boolean;
  ctrl?:boolean;
}

export type ClickShortcut = BaseShortcut & {
  clickableId: string;
}

export type CallbackShortcut = BaseShortcut & {
  callback: () => void;
  deps:any[];
}

export type Shortcut = ClickShortcut | CallbackShortcut;
