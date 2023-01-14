import { Flex, Stack, Image, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isShapesPanelOpenState } from "../../../State/State";
import { useRecoilState } from "recoil";
import { signal_addPrimitiveObject } from "../../../State/SceneUiControlActions";
import { socket_addPrimitiveObject } from "../SceneComponents/Commands/SocketCommands";
import uuid from "react-uuid";
import { isDeletable } from "../../../State/SceneState";
import { useSnapshot } from "valtio";

export function PrimitiveObjectsPanel(props) {
   const deletable = useSnapshot(isDeletable);
  const [isOpen, setIsOpen] = useRecoilState(isShapesPanelOpenState);
  useEffect(() => {
    setIsOpen(false)
  },[deletable])
 
  const data = [
    // {
    //   icon: "https://img.icons8.com/color/48/null/object.png",
    //   label: "browser",
    // },
    {
      icon: "https://img.icons8.com/color/48/null/plugin.png",
      type: "paintboard",
      label: "paintboard",
    },
    {
      icon: "https://img.icons8.com/color/48/null/plugin.png",
      type: "storyboard",
      label: "storyboard",
    },
    {
      icon: "https://img.icons8.com/color/48/null/3d-select--v1.png",
      type: "object",
      label: "box",
    },
    {
      icon: "https://img.icons8.com/color/48/null/3d-select--v1.png",
      type: "object",
      label: "cylinder",
    },
    {
      icon: "https://img.icons8.com/color/48/null/3d-select--v1.png",
      type: "object",
      label: "sphere",
    },
    {
      icon: "https://img.icons8.com/color/48/null/3d-select--v1.png",
      type: "object",
      label: "torus",
    },
    {
      icon: "https://img.icons8.com/color/48/null/3d-select--v1.png",
      type: "object",
      label: "capsule",
    },
    {
      icon: "https://img.icons8.com/color/48/null/3d-select--v1.png",
      type: "object",
      label: "tube",
    },
    {
      icon: "https://img.icons8.com/color/48/null/object.png",
      type: "model",
      label: "table",
    },
    {
      icon: "https://img.icons8.com/color/48/null/object.png",
      type: "model",
      label: "engine",
    },
    {
      icon: "https://img.icons8.com/color/48/null/object.png",
      type: "model",
      label: "shoe",
    },
  ];
  return isOpen ? (
    <Flex
      overflow={"scroll"}
      css={{
        scrollbarWidth: "0px",
      }}
      color={"white"}
      direction={"row"}
      {...props}
      w={"100%"}
      p={3}
      bg={"rgb(10, 10 , 10 , 0.4)"}
      borderRadius={"20px"}
      // backdropFilter={"blur(50%)"}
      backdropBlur={'base'}
    >
      <Stack
        css={{
          scrollbarWidth: "0",
        }}
        direction={"row"}
        w={"100"}
      >
        {data.map((data, index) => {
          return (
            <Item
              key={index}
              icon={data.icon}
              label={data.label}
              type={data.type}
            ></Item>
          );
        })}
      </Stack>
    </Flex>
  ) : (
    ""
  );
}

function Item({ icon, label , type}) {
  const addobject = () => {
    socket_addPrimitiveObject(uuid(), label , [0,0,0] , type )
    // signal_addPrimitiveObject(label);
  };
  return (
    <Button bg={"none"} width={"100px"} height={"50px"} onClick={addobject}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems={"center"}
        width={"100px"}
        height={"50px"}
      >
        <Image width={"30px"} height={"30px"} src={icon}></Image>
        <Text size={"sm"} fontSize={"1rem"}>
          {label}
        </Text>
      </Flex>
    </Button>
  );
}
