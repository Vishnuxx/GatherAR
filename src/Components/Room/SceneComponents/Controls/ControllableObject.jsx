import { Box } from "@chakra-ui/react";
import { Html, PivotControls, TransformControls } from "@react-three/drei";
import { useRef } from "react";
import { useSnapshot } from "valtio";
import { APPCOLORS } from "../../../../AppConstants";
import {
  transformModeState,
  TRANSFORM_MODE,
} from "../../../../State/SceneState";
import { socket_updateObject } from "../Commands/SocketCommands";

export function ControllableObject({ object }) {
  const transformmode = useSnapshot(transformModeState);
  const meshref = useRef()
  const onClick = (e) => {
   
    console.log(e);
    transformModeState.currentObjectUid = e.object.uuid.toString();
    console.log(transformmode.currentObjectUid);
  };


  const drag = (e) =>{
    console.log("e")
    // /socket_updateObject(object.uuid , )
  } 

   const removeTransformControls = () => {
     transformModeState.currentObjectUid = null;
   };

console.log("uoda")
  return (
    <PivotControls
      onPointerMissed={removeTransformControls}
      onDrag={drag}
      fixed
      scale={200}
      activeAxes={[true, true, true]}
      depthTest={false}
      visible={transformModeState.currentObjectUid != null}
    >
      <mesh ref={meshref} onClick={onClick}>
        <Html>
          <TransformControlLabels
            isVisible={transformmode.currentObjectUid == object.uuid}
          ></TransformControlLabels>
        </Html>
        <primitive object={object}></primitive>
      </mesh>
    </PivotControls>
  );
}

function TransformControlLabels({isVisible}) {
    console.log("is visible ",isVisible)
  const setTransformMode = (mode) => {
    transformModeState.value = mode;
  };
  return (
    isVisible &&
    <div>
      <Box
        onClick={() => setTransformMode(TRANSFORM_MODE.TRANSLATE)}
        bg={APPCOLORS.panel}
        p={2}
        borderRadius={100}
      >
        Translate
      </Box>
      <Box
        onClick={() => setTransformMode(TRANSFORM_MODE.SCALE)}
        bg={APPCOLORS.panel}
        p={2}
        borderRadius={100}
      >
        Scale
      </Box>
      <Box
        onClick={() => setTransformMode(TRANSFORM_MODE.ROTATE)}
        bg={APPCOLORS.panel}
        p={2}
        borderRadius={100}
      >
        Rotate
      </Box>
    </div>
  );
}
