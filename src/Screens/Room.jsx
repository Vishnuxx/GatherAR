import { Box, Button, Stack } from "@chakra-ui/react";
import { ZCanvas } from "../Components/Room/SceneComponents/ZCanvas";

import { useEffect,  useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { RoomOptionsPanel } from "../Components/Room/Panels/RoomOptionsPanel";
import { LoadingModal } from "../GlobalComponents/LoadingModal";
import { ShapesPanel } from "../Components/Room/Panels/ShapesPanel";
import { ActionsPanel } from "../Components/Room/Panels/ActionsPanel";
import { Overlay } from "../Components/Room/Panels/Overlay/Overlay";
import { initPeer } from "../Utilities/peerConnection";
import { isHost, isParticipant, isUndefinedHost } from "../Utilities/hostValidation";
import { APPROUTES } from "../AppConstants";
import { generateSharingLink } from "../Utilities/user";


export function EffectUser() {
  this.name = "user";
  this.rooms = [
    {
      id: "effect1",
      isHost: true,
    },
  ];
}

export function Room({}) {
  const [isLoading, setisLoading] = useState(true);

  const location = useLocation();
  const navigator = useNavigate();



  useEffect(()=>{

    console.log(isUndefinedHost(location));
  
    if(isUndefinedHost(location)) {
      window.alert('Something went wrong. please try again')
      navigator(APPROUTES.home)
      return
    }
   
    if(isHost(location)) {
       initPeer(null , (id)=>{
      

        
        console.log(generateSharingLink(id));
       })
    }
     
    if(isParticipant(location)) {
      console.log("part");
    }
  });



  return (
    <Box height={"100vh"} width="100vw" bg={"#262626"}>
      <LoadingModal isOpen={isLoading}></LoadingModal>

      <EffectScreen></EffectScreen>
    </Box>
  );
}

function EffectScreen() {
  return (
    <>
      <ZCanvas></ZCanvas>
      <RoomOptionsPanel></RoomOptionsPanel>
      <Overlay></Overlay>
      <Stack dir="vertical" position={"absolute"} bottom={0} width={"100vw"}>
        <ShapesPanel bottom="150px"></ShapesPanel>
        <ActionsPanel></ActionsPanel>
      </Stack>
    </>
  );
}
