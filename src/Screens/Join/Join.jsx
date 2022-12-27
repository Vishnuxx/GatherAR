

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { APPCOLORS, APPROUTES } from "../../AppConstants";
import { Background } from "../../GlobalComponents/Background";


// import { TitleAndLogo } from "../Components/TitleAndLogo";


export function Join() {
  const navigate = useNavigate();
  const [remoteId, setRemoteId] = useState("");
  const [showError, setShowError] = useState("");

  //update the remote id from text field
  const updateRemoteID = (e) => {
    setRemoteId(e.target.value);
  };

  const joinRoom = () => {
    //TD: check wheather this remote id exist in server
    //if true
    navigate("/editor", { state: { type: "join", remoteId: remoteId } });
    //if false
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
      <Text fontSize={"0.8rem"} color={APPCOLORS.errorText}>
        {showError}
      </Text>

      <Link to={APPROUTES.room} state={{ type: "join", remoteId: remoteId }}>
        <Button
          // onClick={joinRoom}
          m={"4"}
          color="white"
          backgroundColor={"#00C193"}
        >
          Join Room
        </Button>
      </Link>
    </Flex>
  );
}
