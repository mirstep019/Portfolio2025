import "./globals.css";

export const metadata = {
  title: "Miroslav Stepanek",
  description: "Web portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
