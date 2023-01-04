import "./global.css";

import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className}>
      <body>
        <div className="bg-white max-w-7xl w-100 w-full">{children}</div>
      </body>
    </html>
  );
}
