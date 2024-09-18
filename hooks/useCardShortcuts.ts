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
      const click = (elementId:string, includeId:boolean = true) => {
        e.preventDefault();
        document.getElementById(includeId ? `${elementId}-${id}` : elementId)?.click?.();
      }

      switch (e.key) {
        case 'Control':
          setCtrl(true);
          break;
        case 'Alt':
          setAlt(true);
          break;
        case 'Escape':
          document.getElementById("NO-SELECT")?.focus();
          break;
      }

      
      if (ctrl && alt) {
        switch (e.key) {
          case 'h':
            click("home-page-button", false);
            break;
          case '1':
            click("search-page-button", false);
            break;
          case '2':
            click("user-page-button", false);
            break;
          case '3':
            click("compose-page-button", false);
            break;
          case '4':
            click("settings-page-button", false);
            break;
          case '5':
            click("info-page-button", false);
            break;
          case 'l':
            click("like-list");
            break;
        }
      }

      else if (alt) { 
        switch (e.key) {
          case 'l':
            click("like-post");
            break;
          case 's':
            click("save-post");
            break;
          case 'c':
            click("share-post");
            break;
          case 'u':
            click("user-post");
            break;
          case 'e':
            click("expand-post");
            break;
        }
      }

      else if (!alt && !ctrl) {
        switch (e.key) {
          case 'ArrowRight':
            click("go-forward");
            break;
          case 'ArrowLeft':
            click("go-back");
            break;
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [ctrl, alt, id]);
}
