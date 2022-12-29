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
  listenIncomingCalls,
  listenIncomingConnections,
  onDisconnected,
  onError,
  reconnect,
} from "../Utilities/peerConnection";
import {
  isHost,
  isParticipant,
  isUndefinedHost,
} from "../Utilities/hostValidation";
import { APPROUTES } from "../AppConstants";
import { generateSharingLink } from "../Utilities/user";

import { useSetRecoilState, } from "recoil";
import { peerList,  } from "../Utilities/participantManager";
import { AudioManager } from "../Components/Room/Components/AudioManager";
import { sharingLink } from "../State/State";

export function Room({}) {
  const [isLoading, setisLoading] = useState(false);
  const setSharingLink = useSetRecoilState(sharingLink)

  const location = useLocation();
  const navigator = useNavigate();
  const updatePeerList = useSetRecoilState(peerList);


  const host = () => {
    initPeer(null, (myId) => {
      console.log(generateSharingLink(myId));
      setSharingLink(generateSharingLink(myId))
    });
  }


  const participant = () => {
    initPeer(null, (myId) => {
      console.log(`my id is ${myId} `);
      console.log(location.state.roomId);
      connectPeer(location.state.roomId);
    });
  }

  

  useEffect(() => {
    if (isUndefinedHost(location)) {
      window.alert("Something went wrong. please try again");
      navigator(APPROUTES.home);
      return;
    }

    if (isHost(location)) {
      host()
    }

    if (isParticipant(location)) {
      participant();
    }




    listenIncomingConnections((conn) => {
      console.log(`${conn.peer} is connected`);
      updatePeerList((oldvalue) => [...oldvalue , {
        id : conn.peer
      }]);
    });

    onError((err) => {
      console.log(err);
      window.alert("err");
      navigator(APPROUTES.home);

      return;
    });

    onDisconnected(() => {
      const confirm = window.confirm("Connection lost unexpectedly ");
      if (confirm) {
        reconnect();
      } else {
        navigator(APPROUTES.home);
      }
    });

    return onDestroy;
  }, []);

  const onDestroy = () => {
    console.log("component unmounted");
  };

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
    <AudioManager></AudioManager>
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
