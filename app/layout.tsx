
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalesPilot AI | Smart Sales Management",
  description:
    "Pilotez vos prospects, clients, devis et relances avec SalesPilot AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
