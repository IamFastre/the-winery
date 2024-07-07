import { KeyboardEventHandler, MouseEventHandler } from "react";

export function focusable(activeClass:string, onClick?:MouseEventHandler<HTMLElement>) {
  const onKeyDown:KeyboardEventHandler<HTMLElement> = e => {
    if (e.key === 'Enter')
      e.currentTarget.classList.add(activeClass);
  };

  const onKeyUp:KeyboardEventHandler<HTMLElement> = e => {
    if (e.key === 'Enter') {
      e.currentTarget.classList.remove(activeClass);

      if (e.currentTarget.click)
        e.currentTarget.click();
      else
        onClick?.({} as any);
    }
  };

  return {
    onKeyDown,
    onKeyUp,
    onClick,
    tabIndex: 0
  };
}
