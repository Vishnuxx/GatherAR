import { useEffect, useRef, useState } from "react";
import { Group, Scene } from "three";
import { transformModeState } from "../../../State/SceneState";
import { getSocket } from "../../../Utilities/socketConnection";
import { ControllableObject } from "./Controls/ControllableObject";
import { UIControlManager } from "./Controls/UIControlManager";
import { ZTransformControls } from "./Controls/ZTransformControls";
import { getPrimitiveObject } from "./SceneUtils/primitiveObjects";

export function ZScene() {
  const root = useRef();
  const [socket, setsocket] = useState(getSocket());
  const [children, setChildren] = useState([]);

  //listen for socket events
  useEffect(() => {
    socket.on("user-add-object", (data) => {
      const { name, uid, position } = data;
      console.log("object-added");
      setChildren((state) => [
        {
          object: getPrimitiveObject(name, uid),
          position: position,
        },
        ...state,
      ]);
    });

    socket.on("remove-object", (data) => {});

    socket.on("update-object", (data) => {});
  }, [socket]);

 
  return (
    <group ref={root} name="editorScene" >
        <UIControlManager socket={socket}></UIControlManager>
      <ZTransformControls objects={root.current}></ZTransformControls>
      {children.map((child, i) => {
       return <ControllableObject key={i} object={child.object} position={child.position}></ControllableObject>;
      })}
    </group>
  );
}
