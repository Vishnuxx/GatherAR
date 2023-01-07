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
import { useNavigate, Link } from "react-router-dom";
import { APPCOLORS, APPGRADIENTS, APPROUTES } from "../AppConstants";
import { Background } from "../GlobalComponents/Background";
import { USERTYPE } from "../Utilities/hostValidation";
import { useLocation } from "react-router-dom";
import { showLoading } from "../State/appActions";
import { checkLoginStatus } from "../Utilities/Auth";
import { getUserData } from "../Utilities/localDataStorage";
// import { TitleAndLogo } from "../Components/TitleAndLogo";

export function Join() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [isMale, setIsMale] = useState(null);
  const [showError, setShowError] = useState("");
  const [info, setinfo] = useState(null);
  const location = useLocation();

  const getIdfromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    const parameterValue = searchParams.get("id");
    if (parameterValue != null && parameterValue.toString().length > 0) {
      setRemoteId(parameterValue);
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  //update the remote id from text field
  const updateRemoteID = (e) => {
    setRemoteId(e.target.value);
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

    if (remoteId === "") {
      setShowError("Room Id should not be blank");
      return;
    }

    // if (isMale == null) {
    //   setShowError("Please select your Avatar");
    //   return;
    // }

    setShowError("");

    //if true
    navigate(APPROUTES.room, {
      state: {
        userType: USERTYPE.PARTICIPANT,
        username : name,
        isMale: isMale,
        roomId: remoteId,
      },
    });
    //if false
  };

  useEffect(() => {
    setinfo(getUserData());
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

  useEffect(() => {
    showLoading(false);

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
      color={APPCOLORS.text}
    >
      <Background></Background>
      <Stack w={"300px"} gap={"5"} height={"90vh"} justify={"center"}>
        {/* <TitleAndLogo></TitleAndLogo> */}
        <Text fontSize={"2rem"}>Join Room</Text>

        <Input
          color={"white"}
          maxWidth={"300px"}
          placeholder="Enter your name"
          value={name}
          onChange={updateName}
        />

        {
          <Input
            color={"white"}
            maxWidth={"300px"}
            placeholder="Room ID"
            value={remoteId}
            onChange={updateRemoteID}
          />
        }

        {/* <FormLabel color={"white"} w={"fit-content"} justifyContent={"center"}>
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
        </RadioGroup> */}
        <Text fontSize={"0.8rem"} color={APPCOLORS.errorText}>
          {showError}
        </Text>

        <Button
          onClick={joinRoom}
          m={"4"}
          color="white"
          bg={APPGRADIENTS.primarybutton}
        >
          Join Room
        </Button>
      </Stack>
    </Stack>
  );
}
