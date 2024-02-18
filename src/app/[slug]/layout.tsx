import HomeLink from "@/components/homeLink/homeLink";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <footer className="mt-12">
        <HomeLink />
      </footer>
    </>
  );
}
