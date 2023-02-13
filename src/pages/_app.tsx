import "../styles/globals.css";

import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { AuthContext } from "../contexts/authContext";
import { supabase } from "../server/api";

async function returnSession() {
  const { data, error } = await supabase.auth.getSession();
  return data;
}

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [session, setSession] = useState<any>(undefined);

  useEffect(() => {
    const sessionData = returnSession();
    sessionData.then((res) => {
      setSession(res);
    });
  }, []);

  return (
    <AuthContext.Provider value={session}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
