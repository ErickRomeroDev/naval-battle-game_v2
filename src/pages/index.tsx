import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { Initialize } from "@/features/battle-naval/components/Initialize";
import { BattleShip } from "@/features/battle-naval/components/battle-ship";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BattleShip/>
      <Initialize/>
    </>
  );
}
