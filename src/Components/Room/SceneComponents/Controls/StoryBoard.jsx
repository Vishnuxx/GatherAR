import {
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Html, PivotControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { APPGRADIENTS } from "../../../../AppConstants";
import { isDeletable } from "../../../../State/SceneState";
import { getSocket } from "../../../../Utilities/socketConnection";
import { socket_updateStoryBoardText } from "../Commands/SocketCommands";

export function StoryBoard({ uuid, position }) {
  const [text, settext] = useState();

  const focus = () => {
    isDeletable.value = true;
    isDeletable.uuid = uuid;
  };

  const unfocus = () => {
    isDeletable.value = false;
    isDeletable.uuid = null;
  };

  const onTextChanged = (e) => {
    settext(e.target.value);
    socket_updateStoryBoardText(uuid, text);
    console.log(text);
  };

  useEffect(() => {
    const handler = (data) => {
      const { uuid, text } = data;
      console.log(text);
      if (uuid === uuid) {
        settext(text);
      }
    };
    getSocket().on("user-storyboard-text-changed", handler);

    return ()=> {
      getSocket().off("user-storyboard-text-changed");
      console.log("sd")
    }
  }, [uuid]);

  return (
    <PivotControls
      fixed
      scale={200}
      offset={[0, 4, 0]}
      activeAxes={[true, true, false]}
      depthTest={false}
      visible
      // anchor={[0,1,0]}
    >
      <mesh uuid={uuid} onPointerMissed={unfocus}>
        <Html transform>
          <Stack
            bg={"white"}
            overflow={"hidden"}
            w={"400px"}
            h={"350px"}
            borderRadius={10}
          >
            <Flex p={3} bg={APPGRADIENTS.primarybutton} onClick={focus}>
              <Text fontWeight={"bold"}>StoryBoard</Text>
            </Flex>
            <Textarea
              onClick={focus}
              p={5}
              value={text}
              onChange={onTextChanged}
              color={"black"}
              w={"100%"}
              h={"100%"}
              border={"none"}
              placeholder="Type your message here"
            ></Textarea>
          </Stack>
        </Html>
      </mesh>
    </PivotControls>
  );
}
