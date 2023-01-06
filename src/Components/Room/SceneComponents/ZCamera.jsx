import { ZapparCamera } from "@zappar/zappar-react-three-fiber";
import { useLayoutEffect, useRef } from "react";
import { useThree } from "react-three-fiber";


export function ZCamera() {

  const set = useThree((state) => state.set);
  const cameraRef = useRef();

  useLayoutEffect(() => {
    set(() => ({ camera: cameraRef.current }));
  }, []);
    return <ZapparCamera ref={cameraRef} environmentMap />;
}