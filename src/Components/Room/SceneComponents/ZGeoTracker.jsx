import { useEffect, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { DoubleSide, Euler, Quaternion, Vector3 } from "three";
import { currentCameraPosition } from "../../../State/roomState";
import { getSocket } from "../../../Utilities/socketConnection";

export function ZGeoTracker() {
  const ref = useRef();
  const {camera} = useThree()
  const socketRef = useRef(getSocket())
  var positionVector = useRef(new Vector3()); // create once an reuse it
  var rotationVector = useRef(new Vector3());

  
  const getWorldPos = (object3d) => {
    object3d.getWorldPosition(positionVector.current)
  };

  //calculates the rotation
  useEffect(() => {
    const handler = (event) => {
      if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
        const { alpha, beta, gamma } = event;
    
        rotationVector.current.set(-((beta / 180) - (90/180)) * Math.PI , -(gamma / 180) * Math.PI , (1 / 180) + 90 * Math.PI)
      }
    }
    window.addEventListener("deviceorientation", handler);

    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  //updates the position changes to server
  useFrame(() => {
   
    //sends my avatar position to the server
    const pos = positionVector.current

    getWorldPos(ref.current)

    if(!pos.equals(positionVector) ) {
        socketRef.current.emit("my-avatar-transforms", {
          position: positionVector.current.toArray(),
          rotation: rotationVector.current.toArray(),
        });
       
    }
    
    // currentCameraPosition.value = positionVector.current
  });

  const double = DoubleSide;
  return (
    <mesh ref={ref}  >
      {/* <planeGeometry></planeGeometry>
      <meshStandardMaterial side={double}></meshStandardMaterial> */}
    </mesh>
  );
}
