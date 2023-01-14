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
import { Model } from "../SceneUtils/Model";
import { Primitive } from "../SceneUtils/Primitive";
import { getPrimitiveObject } from "../SceneUtils/primitiveObjects";

export function ControllableModel({ type, uuid }) {
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

  console.log("sdsd")
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
      <mesh onClick={onClick} onPointerMissed={removeTransformControls}>
        {<Model type={type} uuid={uuid}></Model>}
      </mesh>
    </PivotControls>
  );
}

