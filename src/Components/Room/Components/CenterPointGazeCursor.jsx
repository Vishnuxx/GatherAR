import { Box, Flex } from "@chakra-ui/react";
import { EditorState } from "../Models/EditorState";
import {useSnapshot} from 'valtio'

export function CenterPointGazeCursor(props) {
  const isHovering = useSnapshot(EditorState.isHovering)
  console.log(isHovering)
  return (
    <Flex
      css={{ touchAction: "none" }}
      pointerEvents={"none"}
      width={"100vw"}
      height={"100vh"}
      position={"absolute"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box borderRadius={"100%"} w={5} h={5} bg={"white"} border={(isHovering.state)?"6px solid red":'none'} opacity={1}></Box>
    </Flex>
  );
}