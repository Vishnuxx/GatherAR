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
  isHost,
  isParticipant,
  isUndefinedHost,
} from "../Utilities/hostValidation";
import { APPROUTES } from "../AppConstants";
import { generateSharingLink } from "../Utilities/user";

import { useSetRecoilState } from "recoil";
import { peerList } from "../Utilities/participantManager";
import { AudioManager } from "../Components/Room/ManagerComponents/AudioManager";
import { sharingLink } from "../State/State";
import { ConnectionManager } from "../Components/Room/ManagerComponents/ConnectionManager";


export function Room({}) {
  const [isLoading, setisLoading] = useState(false);

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
    <ConnectionManager></ConnectionManager>
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
