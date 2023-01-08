import { Box, Stack } from "@chakra-ui/react";
import { ZCanvas } from "../Components/Room/SceneComponents/ZCanvas";

import { useCallback, useEffect, useState } from "react";

import { useBeforeUnload, useLocation, useNavigate } from "react-router-dom";
import { RoomOptionsPanel } from "../Components/Room/Panels/RoomOptionsPanel";
import { LoadingModal } from "../GlobalComponents/LoadingModal";
import { PrimitiveObjectsPanel } from "../Components/Room/Panels/PrimitiveObjectsPanel";
import { ActionsPanel } from "../Components/Room/Panels/ActionsPanel";
import { Overlay } from "../Components/Room/Panels/Overlay/Overlay";

import { APPROUTES } from "../AppConstants";

import {
  createRoom,
  initSocket,
  joinRoom,
  onJoined,
  onRoomCreated,
  onUserJoined,
  roomAlreadyExist,
  roomNotExist,
} from "../Utilities/socketConnection";
import { isHost, isParticipant, USERTYPE } from "../Utilities/hostValidation";
import { createJoiningLink } from "../Utilities/userMedia";
import {
  addMember,
  setPeerInitialized,
  setRoomAdmin,
  setRoomMembers,
  setSocketInitialized,
  updateJoiningLink,
} from "../State/roomActions";
import { loadingOverlay } from "../State/appState";
import { showLoading } from "../State/appActions";

import { getUserData } from "../Utilities/localDataStorage";
import { getUserDetails } from "../Utilities/db";
import { getUid } from "../Utilities/Auth";
import { ConnectionManager } from "../Components/Room/ManagerComponents/connectionManager";
import { RoomManager } from "../Components/Room/ManagerComponents/roomManager";
import { userType } from "../State/roomState";
import { AudioManager } from "../Components/Room/ManagerComponents/audioManager";

export function Room({}) {
  const location = useLocation();

  useBeforeUnload(useCallback(()=>{
    window.alert('do you want to save')
  }));
  

  //confirmation when user leaves
  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      event.returnValue = "";
      alert('dfd')
     
    };
    window.addEventListener("beforeunload", handler);

    return () => {
      console.log("unloaded")
      window.removeEventListener("beforeunload", handler);
    };
  }, []);

  console.log("room");

  return (
    <Box height={"100vh"} width="100vw" bg={"#262626"}>
      <ConnectionManager />
      <RoomManager location={location} />
      <AudioManager></AudioManager>

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
        <PrimitiveObjectsPanel bottom="150px"></PrimitiveObjectsPanel>
        <ActionsPanel></ActionsPanel>
      </Stack>
    </>
  );
}
