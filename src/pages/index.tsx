import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";

export default function Home() {
  const session = useContext(AuthContext);

  return <div>{JSON.stringify(session)}</div>;
}
