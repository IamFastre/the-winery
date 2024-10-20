import { Metadata } from "next";

import consts from "@/utils/consts";
import { getUserInfo } from "@/utils/api/user/info";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";

import { Content } from "./client";
import styles from "./styles.module.scss";


const Nail = () => (
  <div style={{ fontSize: 26 }}>
    •
  </div>
);

export const metadata:Metadata = {
  title: `Getting Started • ${consts.name}`,
  description: `You just landed in ${consts.name}! here's where you get started.`,
};

export default async function GettingStartedPage() {
  const { data:profile } = await getUserInfo('self');

  return (
    <div style={{ flex: 1 }}>
      <Header
        title={consts.name}
        left={<Nail />}
        right={<Nail />}
        margin="20px"
      />
      <Section style={{ flex: 1 }} containerClassName={styles.sectionContainer} centered>
        <Content profile={profile} />
      </Section>
    </div>
  );
}
