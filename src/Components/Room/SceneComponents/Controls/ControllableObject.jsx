import { Box } from "@chakra-ui/react";
import { Html, PivotControls, TransformControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Matrix4 } from "three";
import { useSnapshot } from "valtio";
import { APPCOLORS } from "../../../../AppConstants";
import {
  transformModeState,
  TRANSFORM_MODE,
} from "../../../../State/SceneState";
import { getSocket } from "../../../../Utilities/socketConnection";
import {
  socket_dragObject,
  socket_updateObject,
  socket_updateObjectTransforms,
} from "../Commands/SocketCommands";
import { Primitive } from "../SceneUtils/Primitive";
import { getPrimitiveObject } from "../SceneUtils/primitiveObjects";

export function ControllableObject({ type , uuid }) {

  const socket = getSocket();
  const transformmode = useSnapshot(transformModeState);
  const pivotRef = useRef();
  const matrx = useRef(new Matrix4());
 const objectRef = useRef()
  const [isVisible, setIsVisible] = useState(false)
 
  const onClick = (e) => {
    console.log(e);
    setIsVisible(true)
    transformModeState.currentObjectUid = objectRef.current?.uuid;
    console.log(transformmode.currentObjectUid);
  };


  useEffect(() => {
    // objectRef.current.uuid = uuid;
    //  pivotRef.current?.matrixAutoUpdate(true);

    const handler = (data) => {
      const { uid, matrix } = data;

      if (uuid == uid) {
        console.log(data);
        matrx.current
          .fromArray(matrix)
          .decompose(
            pivotRef.current?.position,
            pivotRef.current?.quaternion,
            pivotRef.current?.scale
          );
      }
    };
    socket.on("user-updated-objectRef.current-matrix", handler);

    return () => socket.off("user-updated-objectRef.current-matrix", handler);
  }, []);

  const drag = (e) => {
    console.log("e");
    socket_dragObject(uuid, {
      matrix: pivotRef.current?.matrix.toArray(),
    });
  };

  const removeTransformControls = (e) => {
    e.preventDefault();
    console.log("removed");
    setIsVisible(false)
    transformModeState.currentObjectUid = "";
  };

  const loadObject = ()=>{
    return getPrimitiveObject(type , uuid , [0,0,0])
  }

  console.log("uoda");
  return (
    <PivotControls
      ref={pivotRef}
      matrixAutoUpdate
      
      onPointerMissed={removeTransformControls}
      onDrag={drag}
      fixed
      scale={200}
      activeAxes={[true, true, true]}
      depthTest={false}
      visible={isVisible}
    >
      <mesh onClick={onClick}>
      
    { <Primitive  type={type} uuid={uuid}></Primitive>}
    
      </mesh>
    </PivotControls>
  );
}

function TransformControlLabels({ isVisible }) {
  console.log("is visible ", isVisible);
  const setTransformMode = (mode) => {
    transformModeState.value = mode;
  };
  return (
    isVisible && (
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
    )
  );
}
