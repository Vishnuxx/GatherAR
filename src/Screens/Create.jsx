import {
  Button,
  Flex,
  Input,
  Text,
  Radio,
  RadioGroup,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { APPCOLORS, APPROUTES } from "../AppConstants";
import { Background } from "../GlobalComponents/Background";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { USERTYPE } from "../Utilities/hostValidation";
import { createRoom } from "../Utilities/user";

export function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isMale, setIsMale] = useState(null);
  const [showError, setShowError] = useState("");

  //update the remote id from text field
  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const updateAvatar = (value) => {
    console.log(value);
    setIsMale(value);
  };

  const submit = (e) => {
    e.preventDefault();

    if (name === "") {
      setShowError("Name should not be blank");
      return;
    }

    if (roomName === "") {
      setShowError("Room Name should not be blank");
      return;
    }

    if (isMale == null) {
      setShowError("Please select your Avatar");
      return;
    }

    setShowError("");

    // console.table({
    //   name: name,
    //   room: roomName,
    //   isMale: isMale,
    // });

    navigate(APPROUTES.room, {
      state: {
        userType: USERTYPE.HOST,
        name: name,
        isMale: isMale,
        roomId: null,
      },
    });
  };

  return (
    <Flex
      h={"100vh"}
      w={"100vw"}
      flexDirection="column"
      justifyContent="center"
      alignItems={"center"}
    >
      <Background></Background>

      <Stack
        color={"white"}
        w={"50%"}
        gap={"5"}
        direction={"column"}
        maxWidth={"300px"}
      >
        <Text zIndex={1} color={APPCOLORS.mainText}>
          Create Room
        </Text>
        <Input
          type={"text"}
          color={"white"}
          maxWidth={"300px"}
          placeholder="Enter Your Name"
          value={name}
          onChange={updateName}
        />

        <Input
          type={"text"}
          color={"white"}
          maxWidth={"300px"}
          placeholder="Enter Room Name"
          value={roomName}
          onChange={updateRoomName}
        />

        <FormLabel w={"fit-content"} justifyContent={"center"}>
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
          onClick={submit}
          m={"4"}
          color="white"
          backgroundColor={"#00C193"}
        >
          Create
        </Button>
      </Stack>
    </Flex>
  );
}
