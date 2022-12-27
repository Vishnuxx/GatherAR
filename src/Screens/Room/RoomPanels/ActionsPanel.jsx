import { Flex } from "@chakra-ui/react";
import { ActionButton } from "../RoomComponents/ActionButton";
import { AddObjectButton } from "../RoomComponents/AddObjectButton";
import { MicButton } from "../RoomComponents/micButton";


export function ActionsPanel(props) {
  return (
    <Flex
      dir={"horizontal"}
      w={"100vw"}
     
      justifyContent={"space-around"}
      p={"30px"}
      alignItems={"center"}
    >
      <MicButton></MicButton>
      <ActionButton></ActionButton>
      <AddObjectButton></AddObjectButton>
      
    </Flex>
  );
}
