import { Box, Button, Stack } from "@chakra-ui/react";
import { ZCanvas } from "./ZCanvas";
import { RoomOptionsPanel } from "./RoomPanels/RoomOptionsPanel";
import { ActionsPanel } from "./RoomPanels/ActionsPanel";
import { ShapesPanel } from "./RoomPanels/ShapesPanel";
import { Overlay } from "./RoomPanels/Overlay/Overlay";

export function Room({}) {
  return (
    <Box width="100vw" bg={"#262626"}>
      <ZCanvas></ZCanvas>
      <RoomOptionsPanel></RoomOptionsPanel>
      <Stack dir="vertical" position={"absolute"} bottom={0} width={"100vw"}>
        <Overlay></Overlay>
        {/* <ObjectOptionsPanel></ObjectOptionsPanel> */}
        <ShapesPanel bottom="150px"></ShapesPanel>
        <ActionsPanel></ActionsPanel>
      </Stack>
      {/* <CenterPointGazeCursor /> */}
    </Box>
  );
}

const LayoutStyles = {
  actionsPanel: {
    dir: "horizontal",
    w: "100vw",
    justifyContent: "space-around",
    p: "30px",
    alignItems: "center",
  },
};
