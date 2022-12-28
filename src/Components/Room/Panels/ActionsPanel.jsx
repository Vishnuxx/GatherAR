import { Flex } from "@chakra-ui/react";
import { ActionButton } from "../Components/ActionButton";
import { AddObjectButton } from "../Components/AddObjectButton";
import { MicButton } from "../Components/micButton";



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
