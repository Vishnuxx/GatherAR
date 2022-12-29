import { Stack } from "@chakra-ui/react";
import { DoubleSide } from "three";

import {
  ZapparCanvas,
  BrowserCompatibility,
  Loader,
  ZapparCamera,
  InstantTracker,
} from "@zappar/zappar-react-three-fiber";

import { Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from "three";

import { PivotControls } from "@react-three/drei";
import {
  isCalibratingState,
  overlay,
  overlayState,
} from "../../../State/State";
import { useRecoilValue } from "recoil";
import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";
import { AvatarLoader } from "./AvatarLoader";

export function ZCanvas(props) {
  const isCalibration = useRecoilValue(isCalibratingState);
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
        <ZapparCamera environmentMap />

        <InstantTracker placementMode={isCalibration}>
          <AvatarLoader />
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
    </Stack>
  );
}
