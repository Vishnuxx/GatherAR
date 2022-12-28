import {
  Button,
  Flex,
  Input,
  Text,
  Radio,
  RadioGroup,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { APPCOLORS, APPROUTES } from "../AppConstants";
import { Background } from "../GlobalComponents/Background";

// import { TitleAndLogo } from "../Components/TitleAndLogo";

export function Join() {
  const navigate = useNavigate();
  const [remoteId, setRemoteId] = useState("");
  const [isMale, setIsMale] = useState(null);
  const [showError, setShowError] = useState("");

  //update the remote id from text field
  const updateRemoteID = (e) => {
    setRemoteId(e.target.value);
  };

  const updateAvatar = (value) => {
    console.log(value);
    setIsMale(value);
  };

  const joinRoom = () => {
    //TD: check wheather this remote id exist in server
    //if true
    navigate(APPROUTES.room, {
      state: { type: "join", isMale: isMale, remoteId: remoteId },
    });
    //if false
  };

  return (
    <Stack
      gap={5}
      h={"100vh"}
      w={"100vw"}
      flexDirection="column"
      justifyContent="center"
      alignItems={"center"}
    >
      <Background></Background>
      {/* <TitleAndLogo></TitleAndLogo> */}
      <Text zIndex={1} color={APPCOLORS.mainText}>
        Join Room
      </Text>

      <Input
        color={"white"}
        maxWidth={"300px"}
        placeholder="Room ID"
        value={remoteId}
        onChange={updateRemoteID}
      />
      <FormLabel color={"white"} w={"fit-content"} justifyContent={"center"}>
        Select your Avatar
      </FormLabel>
      <RadioGroup
        dir="horizontal"
        color={APPCOLORS.text}
        onChange={updateAvatar}
      >
        <Stack gap={"5"} direction={"row"} justifyContent={"center"}>
          <Radio value={"true"}>Male</Radio>
          <Radio value={"false"}>Female</Radio>
        </Stack>
      </RadioGroup>
      <Text fontSize={"0.8rem"} color={APPCOLORS.errorText}>
        {showError}
      </Text>

      <Button
        onClick={joinRoom}
        m={"4"}
        color="white"
        backgroundColor={"#00C193"}
      >
        Join Room
      </Button>
    </Stack>
  );
}
