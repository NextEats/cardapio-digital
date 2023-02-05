import "../styles/globals.css";

import type { AppProps } from "next/app";
import { WhatsAppContext } from "./../contexts/whatsappContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WhatsAppContext.Provider value="">
      <Component {...pageProps} />
    </WhatsAppContext.Provider>
  );
}
