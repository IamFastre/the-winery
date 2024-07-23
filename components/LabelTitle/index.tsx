import { C } from "@/components/C";

export function LabelTitle({ title, subtitle }:{ title:string; subtitle?:string; }) {
  return (
    <span>
      <C.ACCENT>
        {'> '}
      </C.ACCENT>
      {title}
      {
        subtitle ?
          <C.SECONDARY style={{ fontSize: 12 }}>
            {` (${subtitle})`}
          </C.SECONDARY>
        : null
      }
    </span>
  );
};
