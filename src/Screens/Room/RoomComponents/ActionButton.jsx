import {  Flex , Text } from "@chakra-ui/react";
import { useState } from "react";
import { APPCOLORS } from "../../../AppConstants";


export function ActionButton({text='select'}) {
    const [isPessed, setisPessed] = useState(false);
    const onTouchDown = (e) => {
        e.preventDefault()
        setisPessed(true)
    }

    const onTouchUp = (e) => {
        setisPessed(false);
        e.preventDefault();
    }
  return (
    <Flex
      bg={isPessed ? APPCOLORS.primaryButton : "white"}
      borderRadius={"100%"}
      w={"100px"}
      h={"100px"}
      border={"4px solid #e0e0e0"}
      justifyContent={"center"}
      alignItems={"center"}
      onPointerDown={onTouchDown}
      onPointerUp={onTouchUp}
      onPointerLeave={onTouchUp}
    >
      <Text userSelect={"none"} color={isPessed ? "white" : "black"}>
        {text}
      </Text>
    </Flex>
  );
}



