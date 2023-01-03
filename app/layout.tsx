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
        <div className="bg-slate-800 h-screen w-screen flex justify-center">
          <div className="bg-white max-w-lg w-100 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
