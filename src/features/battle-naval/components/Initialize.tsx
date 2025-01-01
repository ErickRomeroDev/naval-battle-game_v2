import { type ReactElement, useEffect, useState } from "react";
import { useBattleNavalContext } from "../hooks/useBattleNavalContext";
import { Button } from "@/components/ui/button";

export const Initialize = (): ReactElement => {
  const [joinAddress, setJoinAddress] = useState<string>("");
  const [joinAddressFocus, setJoinAddressFocus] = useState(false);
  const [participants, setParticipants] = useState<string>("");
  const [participantsFocus, setParticipantsFocus] = useState(false);
  const { dispatch, contractAddress } = useBattleNavalContext();

  useEffect(() => {
    if (joinAddress === "" && contractAddress !== null) {
      setJoinAddress(contractAddress);
    }
  }, [joinAddress, contractAddress]);

  const handleDeploy = async (): Promise<void> => {
    const deploy = await dispatch({ type: "deploy" });
    console.log({deploy})
  };

  const handleJoin = async (): Promise<void> => {
    await dispatch({ type: "join", contractAddress: "23" });
  };

  return (
    <div>
      <Button onClick={handleDeploy}>Deploy</Button>
    </div>
  );
};
