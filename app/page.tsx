import { Section } from "@/components";
import consts from "@/utils/consts";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Section title="Winery DeFastre" style={{ flex: 1 }}>
        <div style={{ alignItems: 'center', gap: "15px" }}>
          <Image
            src={`${consts.basePath}/static/images/NaipeDeCopas.png`}
            alt="the Winery logo; a purple heart suit with a sharp spiky hexagram on top"
            width={100}
            height={100}
            priority
          />
          <span>
            Hello world!
          </span>
        </div>
      </Section>
    </>
  );
}
