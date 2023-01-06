import { useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";
import { currentCameraPosition } from "../../../State/roomState";
import { getSocket } from "../../../Utilities/socketConnection";

export function ZGeoTracker() {
  const ref = useRef();
  const socketRef = useRef(getSocket())
  var positionVector = useRef(new Vector3()); // create once an reuse it
  var rotationVector = useRef(new Vector3());

  
  const getWorldPos = (object3d) => {
    object3d.getWorldPosition(positionVector.current)
  };

 const getWorldRot= (object3d) => {
   
   object3d.getWorldQuaternion(rotationVector.current);
 };

  useEffect(() => {
    
  }, [ref]);

  //updates the position changes to server
  useFrame(() => {
    ref.current.updateMatrixWorld();
    //sends my avatar position to the server
    const pos = positionVector.current
    const rot = rotationVector
    getWorldPos(ref.current)
    // getWorldRot(ref.current)

    if(!pos.equals(positionVector) ) {
        socketRef.current.emit("my-avatar-transforms", {
          position: positionVector.current.toArray(),
          rotation: [0,0,0],
        });
       
    }
    
    currentCameraPosition.value = positionVector.current
  });

  return (
    <mesh ref={ref}>
      <planeGeometry></planeGeometry>
      <meshStandardMaterial></meshStandardMaterial>
    </mesh>
  );
}
