import { Flex, Stack } from "@chakra-ui/react";
import { ExitRoomButton } from "../Components/ExitRoomButton";
import { ParticipantsButton } from "../Components/ParticipantsButton";
import { SharingLink } from "../Components/SharingLink";
import { ScreenCalibratorButton } from "../Components/SceneCalibratorButton";
import { useSnapshot } from "valtio";
import { isAdmin } from "../../../State/roomState";

export function RoomOptionsPanel(props) {
  const isadmin = useSnapshot(isAdmin);
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
      {/* <ScreenCalibratorButton></ScreenCalibratorButton> */}
      <ParticipantsButton></ParticipantsButton>
      {isadmin.value && <SharingLink></SharingLink>}
    </Stack>
  );
}
