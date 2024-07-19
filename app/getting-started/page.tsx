import { Metadata } from "next";

import { getProfile } from "@/supabase/actions/user";
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
  title: "Getting Started • The Winery",
  description: "You just landed in the Winery! here's where you get started.",
};

export default async function GettingStartedPage() {
  const { data:profile } = await getProfile();

  return (
    <div style={{ flex: 1 }}>
      <Header
        title="The Winery"
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
