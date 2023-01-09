import { Flex } from "@chakra-ui/react";
import { APPGRADIENTS } from "../../../AppConstants";
import { ActionButton } from "../Components/ActionButton";
import { AddObjectButton } from "../Components/AddObjectButton";
import { DeleteObjectButton } from "../Components/DeleteObjectButton";
import { MicButton } from "../Components/micButton";
import { ScreenCalibratorButton } from "../Components/SceneCalibratorButton";



export function ActionsPanel(props) {
  return (
    <Flex
      dir={"horizontal"}
      w={"100vw"}
      bg={APPGRADIENTS.cornerPanelBottom}
      justifyContent={"space-around"}
      p={"30px"}
      alignItems={"center"}
    >
      
      <MicButton></MicButton>
      <ScreenCalibratorButton></ScreenCalibratorButton>
      {/* <ActionButton></ActionButton> */}
      <AddObjectButton></AddObjectButton>
      
    </Flex>
  );
}
