import { Box, Button, Stack } from "@chakra-ui/react";
import { ZCanvas } from "../Components/Room/SceneComponents/ZCanvas";

import { useEffect, useMemo, useRef, useState } from "react";
import Peer from "peerjs";
import { useNavigate, Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import { RoomOptionsPanel } from "../Components/Room/Panels/RoomOptionsPanel";
import { LoadingModal } from "../GlobalComponents/LoadingModal";
import { ShapesPanel } from "../Components/Room/Panels/ShapesPanel";
import { ActionsPanel } from "../Components/Room/Panels/ActionsPanel";
import { Overlay } from "../Components/Room/Panels/Overlay/Overlay";

export function EffectUser() {
  this.name = "user";
  this.rooms = [
    {
      id: "effect1",
      isHost: true,
    },
  ];
}

export function Room({}) {
  const [isLoading, setisLoading] = useState(true);
  //   const [isHost, setisHost] = useRecoilState(null);
  const navigate = useNavigate();
  const peerRef = useRef(null);

  //check if it this is host or a participant
  const ckeckHost = () => {
    switch (navigate.state.type === "create") {
      case "create":
        //is host
        // setisHost(true)
        break;
      case "join":
        //is participant
        //  setisHost(false);
        break;

      default:
        //error go back
        break;
    }
  };

  //navigate(APPROUTES.room , { state: { type: "join", isMale: isMale ,  remoteId: remoteId } });

  //   //used to prevent loosing of my id after page refresh
  //   //checks my id in local storage , if not found , create new peerid
  //   const initMyId = () => {
  //     const storedPeerId = localStorage.getItem("p");

  //     if (storedPeerId) {
  //       peerRef.current = new Peer(storedPeerId);
  //     } else {
  //       const newPeer = new Peer();
  //       localStorage.setItem("peerId", newPeer.id);
  //       peerRef.current = newPeer;
  //     }

  //   };

  //   useEffect(() => {
  //     initMyId();
  //      peerRef.current.on("open", (id) => {
  //        console.log(`My peer ID is: ${id}`);
  //      });
  //   }, []);

  return (
    <Box height={"100vh"} width="100vw" bg={"#262626"}>
      <LoadingModal isOpen={isLoading}></LoadingModal>

      <EffectScreen></EffectScreen>
    </Box>
  );
}

function EffectScreen() {
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
