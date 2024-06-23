import { Header, Section } from "@/components";
import consts from "@/utils/consts";
import Image from "next/image";

export default function Home() {
  const imgSize:number = 200;

  return (
    <div style={{ flex: 1, margin: "10px" }}>
      <Header
        title="The Winery"
        left={(
            <div>•</div>
        )}
        right={(
            <div>•</div>
        )}
        margin="20px"
      />

      <Section style={{ flex: 1 }} centered>
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: "15px" }}>
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
    </div>
  );
}
