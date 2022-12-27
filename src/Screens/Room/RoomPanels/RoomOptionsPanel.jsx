import { Flex, Stack } from "@chakra-ui/react";
import { ExitRoomButton } from "../RoomComponents/ExitRoomButton";
import { ParticipantsButton } from "../RoomComponents/ParticipantsButton";
import { RoomIdPane } from "../RoomComponents/RoomIdWindow";
import { ScreenCalibrator } from "../RoomComponents/SceneCalibrator";



export function RoomOptionsPanel(props) {
  return (
    <Stack
      direction={"row"}
      spacing={3}
      position={"absolute"}
      p={5}
      left="0"
      top={0}
      width={"100vw"}
      height={"50px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ExitRoomButton></ExitRoomButton>
      <ScreenCalibrator></ScreenCalibrator>
      <ParticipantsButton></ParticipantsButton>
      <RoomIdPane></RoomIdPane>
    </Stack>
  );
}
