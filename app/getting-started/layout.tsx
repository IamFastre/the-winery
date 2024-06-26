import { Header } from "@/components";

const Nail = () => (
  <div style={{ fontSize: 26 }}>
    •
  </div>
);

export default function Layout({ children }: Readonly<{ children:React.ReactNode }>) {
  return (
    <div style={{ flex: 1, margin: 10 }}>
      <Header
        title="The Winery"
        left={<Nail />}
        right={<Nail />}
        margin="17px"
      />
      {children}
    </div>
  );
}
