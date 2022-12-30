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
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { APPCOLORS, APPROUTES } from "../AppConstants";
import { Background } from "../GlobalComponents/Background";
import { USERTYPE } from "../Utilities/hostValidation";

// import { TitleAndLogo } from "../Components/TitleAndLogo";

export function JoinUrl() {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isMale, setIsMale] = useState(null);
  const [showError, setShowError] = useState("");
  const location = useLocation();

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateAvatar = (value) => {
    setIsMale(value);
  };

  const joinRoom = (e) => {
    e.preventDefault();

    if (name === "") {
      setShowError("Name should not be blank");
      return;
    }

    if (roomId === "") {
      setShowError("Room Id should not be blank");
      return;
    }

    if (isMale == null) {
      setShowError("Please select your Avatar");
      return;
    }

    setShowError("");

    console.table({
      name: name,
      room: roomId,
      isMale: isMale,
    });

    //if true
    navigator(APPROUTES.room, {
      state: {
        userType: USERTYPE.PARTICIPANT,
        isMale: isMale,
        roomId: roomId,
      },
    });
    //if false
  };

  const getIdfromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    const parameterValue = searchParams.get("id");
    if (parameterValue != null && parameterValue.toString().length > 0) {
      setRoomId(parameterValue);
    } else {
      navigator(APPROUTES.home);
    }
  };

  useEffect(() => {
    getIdfromURL();
  }, []);

  return (
    <Stack
      gap={5}
      h={"100%"}
      w={"100vw"}
      flexDirection="column"
      justify="center"
      align={"center"}
    >
      <Background></Background>
      <Stack
        dir="vertical"
        gap={2}
        w={"300px"}
        height={'90vh'}
        justify={"center"}
       
        color={APPCOLORS.text}
      >
        {/* <TitleAndLogo></TitleAndLogo> */}
         <Text fontSize={"2rem"}>
          Join Room
        </Text>

        <Input
          color={"white"}
          maxWidth={"300px"}
          placeholder="Enter your name"
          value={name}
          onChange={updateName}
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
    </Stack>
  );
}
