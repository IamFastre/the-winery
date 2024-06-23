import { Section } from "@/components";
import consts from "@/utils/consts";
import Image from "next/image";

export default function Home() {
  const imgSize:number = 200;

  return (
    <>
      <Section title="Winery DeFastre" style={{ flex: 1 }} containerStyle={{ justifyContent: 'center' }} centered>
        <div style={{ alignItems: 'center', gap: "15px" }}>
          <Image
            src={`${consts.basePath}/static/images/NaipeDeCopas.png`}
            alt="the Winery logo; a purple heart suit with a sharp spiky hexagram on top"
            width={imgSize}
            height={imgSize}
            priority
          />
          <span>
            Hello, there!
          </span>
          <a className="color-primary" href="https://youtu.be/rEq1Z0bjdwc" target="_blank">
            General Kenobi!
          </a>
        </div>
      </Section>
    </>
  );
}
