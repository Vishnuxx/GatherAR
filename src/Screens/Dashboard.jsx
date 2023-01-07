import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { APPCOLORS, APPGRADIENTS, APPROUTES } from "../AppConstants";
import { JoinAndCreateButtons } from "../Components/Profile/joinAndCreateButtons";
import { RoomList } from "../Components/Profile/RoomList";
import { RoomListItem } from "../Components/Profile/RoomListItem";
import { UserDrawer } from "../Components/Profile/UserDrawer";

import { Background } from "../GlobalComponents/Background";
import { useToaster } from "../hooks/Toaster";
import { authState } from "../State/appState";
import { checkLoginStatus, isAuthenticated } from "../Utilities/Auth";
import { getUserData } from "../Utilities/localDataStorage";

export function Dashboard() {
  const user = getUserData();
  const navigate = useNavigate();
  const toast = useToaster();
  const isAuthenticated = useSnapshot(authState)

  
  useEffect(() => {
    if (isAuthenticated.value) {
       toast("Is Logged In");
       return 
    }
   
    toast("Not authenn Please Login");
    navigate(APPROUTES.home, {
      replace: true,
    });
    
  }, [isAuthenticated]);

  return (
    <Stack
      w={"100%"}
      h={"100%"}
      direction={"column"}
      color={APPCOLORS.text}
      gap={2}
    >
      <Background></Background>

      <Stack
        w={"100%"}
        position={"absolute"}
        bg={APPGRADIENTS.cornerPanel}
        p={5}
        color={APPCOLORS.text}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"1.3rem"} fontWeight={"bold"}>
          Your Rooms
        </Text>
        <Stack direction={"row"} alignItems={"center"}>
          <Text align={"right"} noOfLines={1} fontStyle={"bold"}>
            {user?.username}
          </Text>
          <UserDrawer></UserDrawer>
        </Stack>
      </Stack>

      <RoomList
        roomlist={[{}, {}, {}]}
        overflowY={"scroll"}
        h={"90vh"}
        pt={"10"}
        pb={"10"}
      ></RoomList>

      <JoinAndCreateButtons
        bg={APPGRADIENTS.cornerPanelBottom}
        justifyContent={"flex-end"}
        direction={"row"}
        w={"100vw"}
        gap={5}
        position={"absolute"}
        bottom={0}
        p={10}
      ></JoinAndCreateButtons>
    </Stack>
  );
}
