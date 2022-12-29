import { Box, Stack } from "@chakra-ui/react";
import { ZCanvas } from "../Components/Room/SceneComponents/ZCanvas";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoomOptionsPanel } from "../Components/Room/Panels/RoomOptionsPanel";
import { LoadingModal } from "../GlobalComponents/LoadingModal";
import { ShapesPanel } from "../Components/Room/Panels/ShapesPanel";
import { ActionsPanel } from "../Components/Room/Panels/ActionsPanel";
import { Overlay } from "../Components/Room/Panels/Overlay/Overlay";
import {
  connectPeer,
  initPeer,
  listenIncomingConnections,
  onError,
} from "../Utilities/peerConnection";
import {
  isHost,
  isParticipant,
  isUndefinedHost,
} from "../Utilities/hostValidation";
import { APPROUTES } from "../AppConstants";
import { generateSharingLink } from "../Utilities/user";
import { sharingLink } from "../State/State";
import { useSetRecoilState } from "recoil";

export function Room({}) {
  const [isLoading, setisLoading] = useState(false);

  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    if (isUndefinedHost(location)) {
      window.alert("Something went wrong. please try again");
      navigator(APPROUTES.home);
      return;
    }

    if (isHost(location)) {
      initPeer(null, (myId) => {
        console.log(generateSharingLink(myId));
      });
    }

    if (isParticipant(location)) {
      initPeer(null, (myId) => {
        console.log(`my id is ${myId}`);
        connectPeer(location.state.roomId);
      });
    }

    listenIncomingConnections((conn) => {
      console.log(conn);
    });

    onError((err) => {
      console.log(err);
      window.alert("err");
      navigator(APPROUTES.home);

      return;
    });
  }, []);

  console.log("room");

  return (
    <Box height={"100vh"} width="100vw" bg={"#262626"}>
      <LoadingModal isOpen={isLoading}></LoadingModal>
      <EffectScreen></EffectScreen>
    </Box>
  );
}

function EffectScreen() {
  console.log("EffectScreen");
  return (
    <>
      <ZCanvas></ZCanvas>
      <RoomOptionsPanel></RoomOptionsPanel>
      <Overlay></Overlay>
      <Stack dir="vertical" position={"absolute"} bottom={0} width={"100vw"}>
        <ShapesPanel bottom="150px"></ShapesPanel>
        <ActionsPanel></ActionsPanel>
      </Stack>
    </>
  );
}
