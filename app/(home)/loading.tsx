import { Section } from "@/components/Section";
import { LoadingText } from "@/components/LoadingText";

export default function Loading() {
  return (
    <Section style={{ flex: 1 }} containerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LoadingText />
    </Section>
  );
}
