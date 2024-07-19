import { C } from "@/components/C";
import { Section } from "@/components/Section";

export default function Loading() {
  return (
    <Section style={{ flex: 1 }} containerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <span>
        <C.ACCENT>
          Loading
        </C.ACCENT>
        <C.SECONDARY>
          ...
        </C.SECONDARY>
      </span>
    </Section>
  );
}
