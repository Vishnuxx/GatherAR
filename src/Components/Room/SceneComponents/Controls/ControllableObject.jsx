import { Box } from "@chakra-ui/react";
import { Html, PivotControls, TransformControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Matrix4, Quaternion, Vector3 } from "three";
import { useSnapshot } from "valtio";
import { APPCOLORS } from "../../../../AppConstants";
import {
  isDeletable,
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

export function ControllableObject({ type, uuid }) {
  const socket = getSocket();
  const pivotRef = useRef();

  const [isVisible, setIsVisible] = useState(false);

  const transform = useRef(new Matrix4());
  const [state, setstate] = useState(0);
  const onClick = (e) => {
    setIsVisible(true);
    isDeletable.value = true;
    isDeletable.uuid = uuid;
  };

  useEffect(() => {
    const handler = (data) => {
      const { uid, matrix } = data;
      //receive object matrix from the server
      if (uuid == uid) {
        pivotRef.current.matrix.fromArray(matrix);

        pivotRef.current.updateMatrixWorld();
      }
    };
    socket.on("user-updated-object-matrix", handler);
    return () => socket.off("user-updated-object-matrix", handler);
  }, [pivotRef]);



  const drag = (matrix) => {
    //send object matrix as array to the server
    const array = [];
    matrix.toArray(array);
    socket_dragObject(uuid, {
      matrix: array,
    });
  };


  const removeTransformControls = (e) => {
    isDeletable.value = false;
    isDeletable.uuid = null;
    setIsVisible(false);
    transformModeState.currentObjectUid = "";
  };

  return (
    <PivotControls
      matrixAutoUpdate={false}
      onDrag={drag}
      fixed
      ref={pivotRef}
      scale={200}
      // activeAxes={[true, true, true]}
      depthTest={false}
      visible={isVisible}
    >
      <mesh onClick={onClick}>
        {
          <Primitive
            onPointerMissed={removeTransformControls}
            type={type}
            uuid={uuid}
          ></Primitive>
        }
      </mesh>
    </PivotControls>
  );
}



function TransformControlLabels({ isVisible }) {
  // console.log("is visible ", isVisible);
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
