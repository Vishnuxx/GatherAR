import { Box, Button, Stack } from "@chakra-ui/react";
import { ZCanvas } from "./ZCanvas";
import {useRecoilState} from "recoil"
import { ScreenCalibrator } from "./RoomComponents/SceneCalibrator";
import { showCalibrator } from "./State";
import { RoomOptionsPanel } from "./RoomPanels/RoomOptionsPanel";
import { ObjectOptionsPanel } from "./RoomPanels/ObjectOptionsPanel";
import { ActionsPanel } from "./RoomPanels/ActionsPanel";

export function Room({}) {

 

  return (
    <Box width="100vw"  bg={"#262626"}>
     
      
      <ZCanvas></ZCanvas>
      <RoomOptionsPanel></RoomOptionsPanel>
      <Stack dir="vertical" position={"absolute"} bottom={0} width={"100vw"}>
        <ObjectOptionsPanel></ObjectOptionsPanel>
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
