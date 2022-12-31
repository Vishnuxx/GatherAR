import { Box, Stack } from "@chakra-ui/react";
import { ZCanvas } from "../Components/Room/SceneComponents/ZCanvas";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoomOptionsPanel } from "../Components/Room/Panels/RoomOptionsPanel";
import { LoadingModal } from "../GlobalComponents/LoadingModal";
import { ShapesPanel } from "../Components/Room/Panels/ShapesPanel";
import { ActionsPanel } from "../Components/Room/Panels/ActionsPanel";
import { Overlay } from "../Components/Room/Panels/Overlay/Overlay";

import { APPROUTES } from "../AppConstants";

import { useSetRecoilState } from "recoil";

import { AudioManager } from "../Components/Room/ManagerComponents/AudioManager";
import { ConnectionManager } from "../Components/Room/ManagerComponents/ConnectionManager";
import {
  createRoom,
  initSocket,
  joinRoom,
  onJoined,
  onRoomCreated,
  roomAlreadyExist,
  roomNotExist,
} from "../Utilities/socketConnection";
import { isHost, isParticipant } from "../Utilities/hostValidation";

export function Room({}) {
  const [isLoading, setisLoading] = useState(false);
  const location = useLocation();
  const username = location.state.username;

  const HOST = function() {
    initSocket((socket) => {
      localStorage.setItem("socketId", socket.id);
      console.log(localStorage.getItem("user").name);
      createRoom({
        uid: localStorage.getItem("currentUID"),
        roomname: location.state.roomname,
        username: localStorage.getItem('user').name,
      });

      roomAlreadyExist((data) => {
        window.alert("room already exists");
        console.log("sd")
      });

      onRoomCreated((roomId) => {
        console.log("room successfully created" , roomId);
        joinRoom(roomId, username);
      });

      // onJoined((data) => {
      //   console.log("you have successfully joined");
      //   console.table({
      //     roomname: data.roomname,
      //     roomadmin: data.roomadmin,
      //     participans: data.participans,
      //   });
      // });

      // roomNotExist(() => {
      //   console.log("room not exist");
      // });
    });
  };

  useEffect(() => {
  

    if (isHost(location)) {
      HOST();
    }

    if (isParticipant(location)) {
    }

    
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
