import { Stack } from "@chakra-ui/react";
import { DoubleSide } from "three";

import {
  ZapparCanvas,
  BrowserCompatibility,
  Loader,
  ZapparCamera,
  InstantTracker,
} from "@zappar/zappar-react-three-fiber";



import { AvatarManager } from "./avatarManager";

import { ZCamera } from "./ZCamera";
import { ZGeoTracker } from "./ZGeoTracker";
import { isCalibratingState } from "../../../State/roomState";
import { useSnapshot } from "valtio";
import { ZScene } from "./ZScene";
import { useEffect } from "react";
import { initSocketCommands } from "./Commands/SocketCommands";


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

        <ZCamera></ZCamera>

        <InstantTracker placementMode={isCalibration.value}>
          <ZGeoTracker></ZGeoTracker>
          <AvatarManager></AvatarManager>

          <ZScene></ZScene>
        </InstantTracker>

        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
    </Stack>
  );
}
