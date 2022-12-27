import { Stack } from "@chakra-ui/react";

import {
  ZapparCanvas,
  BrowserCompatibility,
  Loader,
  ZapparCamera,
  InstantTracker,
} from "@zappar/zappar-react-three-fiber";

import { Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from "three";

import { PivotControls } from "@react-three/drei";
import { showCalibrator } from "./State";
import { useRecoilValue } from "recoil";
import { useEffect, useRef } from "react";
import { Avatar } from "./SceneComponents/Avatar";
import { AvatarLoader } from "./SceneComponents/AvatarLoader";

export function ZCanvas(props) {
  const isCalibration = useRecoilValue(showCalibrator);

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
          <AvatarLoader/>
          <Playground></Playground>
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
        
      </ZapparCanvas>
    </Stack>
  );
}



function Playground() {

    //ECS works here
  return (
    <scene>
      <Obj></Obj>
    </scene>
  );
}

function Obj() {
  const r = useRef();

  return (
    <>
      {/* <primitive ref = {r} object={sphere} position={[0, 0, -5]} />  */}
      <PivotControls depthTest={false} scale={150} anchor={[0, 0, -1]} fixed>
        <mesh position={[0, 0, 0]}>
          <boxGeometry></boxGeometry>
          <meshStandardMaterial />
        </mesh>
      </PivotControls>
    </>
  );
}
