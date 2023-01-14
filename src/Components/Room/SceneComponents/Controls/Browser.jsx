import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Html, PivotControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { APPGRADIENTS } from "../../../../AppConstants";
import { isDeletable } from "../../../../State/SceneState";
import { getSocket } from "../../../../Utilities/socketConnection";
import { socket_updateStoryBoardText } from "../Commands/SocketCommands";

export function Browser({ uuid, position }) {
  const [text, settext] = useState();
  const [url, seturl] = useState("http://www.google.com/custom?q=&btnG=Search");
  const iframeref = useRef();

  const focus = () => {
    isDeletable.value = true;
    isDeletable.uuid = uuid;
  };

  const unfocus = () => {
    isDeletable.value = false;
    isDeletable.uuid = null;
  };

  const goForward = () => {
    iframeref.current.contentWindow.history.forward();
  };

  const goBack = () => {
    iframeref.current.contentWindow.history.back();
  };

  const onTextChange = (e) => {
    seturl(e.target.value);
  };

  const search = (e) => {
    seturl(e.target.value);
  };

  //   useEffect(() => {
  //     const handler = (data) => {
  //       const { uuid, text } = data;
  //       console.log(text);
  //       if (uuid === uuid) {
  //         settext(text);
  //       }
  //     };
  //     getSocket().on("user-storyboard-text-changed", handler);

  //     return () => {
  //       getSocket().off("user-storyboard-text-changed");

  //     };
  //   }, [uuid]);

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
              <Text fontWeight={"bold"}>Browser</Text>
              <Button onClick={goForward}>Next</Button>
              <Button onClick={goBack}>Prev</Button>
              <Input
                onChange={onTextChange}
                bg={"#e0e0e0"}
                color={"black"}
                borderRadius={100}
                p={3}
                type={"url"}
                placeholder={"https://wwww.google.com"}
              ></Input>
              <Button onClick={search}>Search</Button>
            </Flex>
            <iframe
             
              ref={iframeref}
              src={url}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              w={"100vw"}
              h={"100vh"}
            ></iframe>
          </Stack>
        </Html>
      </mesh>
    </PivotControls>
  );
}
