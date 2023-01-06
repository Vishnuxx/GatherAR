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
import { useEffect, useState } from "react";
import { USERTYPE } from "../Utilities/hostValidation";

import { checkLoginStatus } from "../Utilities/Auth";
import { createRoom } from "../Utilities/roomUtils";
import { showLoading } from "../State/appActions";
import { getUserData } from "../Utilities/localDataStorage";

export function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isMale, setIsMale] = useState(null);
  const [showError, setShowError] = useState("");
  const [info, setinfo] = useState("");


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

    if (roomName === "") {
      setShowError("Room Name should not be blank");
      return;
    }

    setShowError("");


    navigate(APPROUTES.room, {
      state: {
        userType: USERTYPE.HOST,
        roomname: roomName,
        username: getUserData().username,
        isMale: isMale,
        roomId: null,
        uid: getUserData().uid,
      },
    });
  };

  useEffect(() => {
    console.log(getUserData())
    showLoading(false);
  }, []);

  useEffect(() => {
    if (info) {
      const username = info.username;
      const avatar = info.isMale;
      setName(username);
      setIsMale(avatar);
    }
  }, [info]);

  

  return (
    <Flex
      h={"100%"}
      w={"100vw"}
      flexDirection="column"
      justifyContent="center"
      alignItems={"center"}
    >
      <Background></Background>

      <Stack
        color={"white"}
        w={"300px"}
        h={"90vh"}
        gap={"5"}
        direction={"column"}
        maxWidth={"300px"}
        justify={"center"}
      >
        <Text fontSize={"2rem"}>Create Room</Text>
        {/* <Input
          type={"text"}
          color={"white"}
          maxWidth={"300px"}
          placeholder="Enter Your Name"
          value={name}
          onChange={updateName}
        /> */}

        <Input
          type={"text"}
          color={"white"}
          maxWidth={"300px"}
          placeholder="Enter Room Name"
          value={roomName}
          onChange={updateRoomName}
        />

        {/* <FormLabel w={"fit-content"} justifyContent={"center"}>
          Select your Avatar
        </FormLabel> */}
        {/* 
        <RadioGroup
          dir="horizontal"
          color={APPCOLORS.text}
          onChange={updateAvatar}
        >
          <Stack gap={"5"} direction={"row"} justifyContent={"center"}>
            <Radio value={"true"}>Male</Radio>
            <Radio value={"false"}>Female</Radio>
          </Stack>
        </RadioGroup> */}
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
