import { Flex, Stack } from "@chakra-ui/react";
import { ExitRoomButton } from "../Components/ExitRoomButton";
import { ParticipantsButton } from "../Components/ParticipantsButton";
import { SharingLink } from "../Components/SharingLink";
import { ScreenCalibratorButton } from "../Components/SceneCalibratorButton";
import { useSnapshot } from "valtio";
import { isAdmin } from "../../../State/roomState";
import { ModelGallary } from "../Components/ModelsGallary";

export function RoomOptionsPanel(props) {
  const isadmin = useSnapshot(isAdmin);
  return (
    <Stack
      direction={"row"}
      spacing={3}
      position={"absolute"}
      p={10}
      left="0"
      top={0}
      width={"100vw"}
      height={"50px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* <ModelGallary></ModelGallary> */}
      <ExitRoomButton></ExitRoomButton>
      {/* <ScreenCalibratorButton></ScreenCalibratorButton> */}
      <ParticipantsButton></ParticipantsButton>
      {isadmin.value && <SharingLink></SharingLink>}
    </Stack>
  );
}
