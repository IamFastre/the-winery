import { basePath } from "@/utils/consts";

export function FontFaces() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'Cascadia';
            font-style: normal;
            src: url('${basePath}/static/fonts/CascadiaCode.woff2') format(woff2);
          }

          @font-face {
            font-family: 'Cascadia';
            font-style: italic;
            src: url('${basePath}/static/fonts/CascadiaCodeItalic.woff2') format(woff2);
          }              
        `,
      }}
    />
  );
}