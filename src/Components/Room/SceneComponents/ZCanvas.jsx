import { Stack } from "@chakra-ui/react";
import { Camera, DoubleSide } from "three";

import {
  ZapparCanvas,
  BrowserCompatibility,
  Loader,

  InstantTracker,
} from "@zappar/zappar-react-three-fiber";



import { AvatarManager } from "./avatarManager";

import { ZCamera } from "./ZCamera";
import { ZGeoTracker } from "./ZGeoTracker";
import { isCalibratingState } from "../../../State/roomState";
import { proxy, useSnapshot } from "valtio";
import { ZScene } from "./ZScene";
import { useEffect, useRef } from "react";
import { initSocketCommands } from "./Commands/SocketCommands";
import { Grid, TransformControls } from "@react-three/drei";
import { Canvas } from "react-three-fiber";
import { atom } from "recoil";


export function ZCanvas(props) {
  const isCalibration = useSnapshot(isCalibratingState);

  useEffect(() => {
   initSocketCommands();
  }, []);
  
 console.log("ZCanvas");


  return (
    <Stack
      position="absolute"
      w={"100vw"}
      h={"100%"}
      css={{ touchAction: "none" }}
    >
      <ZapparCanvas>
        <BrowserCompatibility fallback={() => alert("sorry")} />
        <ZCamera />
        {/* <camera></camera> */}
        <InstantTracker
          enabled={!isCalibration.value}
          placementCameraOffset={[0, 0, -3]}
          placementMode={isCalibration.value}
        >
          {isCalibration.value && (
            <Grid cellColor="white" args={[100, 100]}></Grid>
          )}
          <AvatarManager></AvatarManager>
          <ZScene></ZScene>
          <ZGeoTracker></ZGeoTracker>
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
    </Stack>
  );
}

export const transformcontrol = proxy({
  activeObject : undefined
})