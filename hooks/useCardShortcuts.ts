import { useEffect, useState } from "react";

export function useCardShortcuts(id:number) {
  const [ctrl, setCtrl] = useState<boolean>(false);
  const [alt, setAlt] = useState<boolean>(false);

  useEffect(() => {
    const onKeyUp = (e:KeyboardEvent) => {
      if (e.key === 'Control')
        setCtrl(false);
      else if (e.key === 'Alt')
        setAlt(false);
    }

    document.addEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keyup', onKeyUp);
  }, []);

  useEffect(() => {
    const onKeyDown = (e:KeyboardEvent) => {
      const click = (elementId:string) => {
        e.preventDefault();
        document.getElementById(`${elementId}-${id}`)?.click?.();
      }

      if (e.key === 'Control')
        setCtrl(true);
      else if (e.key === 'Alt')
        setAlt(true);
      else if (e.key === 'Escape')
        document.getElementById("NO-SELECT")?.focus();

      if (!alt && !ctrl) {
        if (e.key === 'ArrowRight')
          click("go-forward");
        else if (e.key === 'ArrowLeft')
          click("go-back");
      }

      if (alt) { 
        if (e.key === 'l')
          click("like-post");
        else if (e.key === 's')
          click("save-post");
        else if (e.key === 'c')
          click("share-post");
        else if (e.key === 'e')
          click("expand-post");
      }

      if (ctrl && alt) {
        if (e.key === 'l')
          click("like-list");
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [ctrl, alt, id]);
}
