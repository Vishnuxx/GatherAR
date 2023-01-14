import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { APPCOLORS, APPGRADIENTS, APPROUTES } from "../AppConstants";
import { JoinAndCreateButtons } from "../Components/Dashboard/joinAndCreateButtons";
import { RoomList } from "../Components/Dashboard/RoomList";
import { RoomListItem } from "../Components/Dashboard/RoomListItem";
import { UserDrawer } from "../Components/Dashboard/UserDrawer";

import { Background } from "../GlobalComponents/Background";
import { useToaster } from "../hooks/Toaster";
import { showLoading } from "../State/appActions";
import { authState } from "../State/appState";
import { checkLoginStatus, getUid, isAuthenticated } from "../Utilities/Auth";
import { fetchAndSaveUserData } from "../Utilities/db";
import { getUserData } from "../Utilities/localDataStorage";

export function Dashboard() {
 
  const navigate = useNavigate();
  const toast = useToaster();
  const isAuthenticated = useSnapshot(authState);

  const [userstate, setuserstate] = useState({});
 
  
  useEffect(()=>{
    // showLoading(true)
    fetchAndSaveUserData(getUserData().uid , (data)=>{
      setuserstate({ ...data });
      showLoading(false)
    })

    // setuserstate({...getUserData()})
    
    // console.log(userstate)
  },[])

  useEffect(() => {
    if (isAuthenticated.value) {
      return;
    }

    toast("Not Authenticated Please Login");
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
            {userstate?.username}
          </Text>
          <UserDrawer roomList={userstate?.rooms}></UserDrawer>
        </Stack>
      </Stack>

      <RoomList
        roomlist={userstate?.rooms}
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
