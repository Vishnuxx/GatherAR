import { TransformControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { transformModeState } from "../../../../State/SceneState";

export function ZTransformControls({ objects }) {
  const ref = useRef();
  const transformmode = useSnapshot(transformModeState);

  useEffect(() => {
    if(!ref.current) return
    if ([null, undefined, ""].includes(transformmode.currentObjectUid)) {
      ref.current.detach();
      return;
    }
    ref.current.attach(
      objects.getObjectByProperty("uuid", transformmode.currentObjectUid)
    );

    
  }, [transformmode]);

  return (
    <>
      {transformmode.currentObjectUid && (
        <TransformControls ref={ref}></TransformControls>
      )}
    </>
  );
}
