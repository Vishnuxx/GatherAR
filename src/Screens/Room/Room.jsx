import { Box, Button, Stack } from "@chakra-ui/react";
import { ZCanvas } from "./ZCanvas";
import { RoomOptionsPanel } from "./RoomPanels/RoomOptionsPanel";
import { ActionsPanel } from "./RoomPanels/ActionsPanel";
import { ShapesPanel } from "./RoomPanels/ShapesPanel";
import { Overlay } from "./RoomPanels/Overlay/Overlay";
import { LoadingModal } from "../../GlobalComponents/LoadingModal";
import { useState } from "react";

export function Room({}) {
  const [isLoading, setisLoading] = useState(true);

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
