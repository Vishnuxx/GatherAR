import { useEffect, useRef, useState } from "react";
import { Group, Scene } from "three";
import { transformModeState } from "../../../State/SceneState";
import { getSocket } from "../../../Utilities/socketConnection";
import { ControllableObject } from "./Controls/ControllableObject";
import { UIControlManager } from "./Controls/UIControlManager";
import { ZTransformControls } from "./Controls/ZTransformControls";
import { Primitive } from "./SceneUtils/Primitive";
import { getPrimitiveObject } from "./SceneUtils/primitiveObjects";
import tablemodel from "../../../assets/Models/low_poly_table.glb";
import { useGLTF } from "@react-three/drei";

export function ZScene() {
  const root = useRef();
  const [socket, setsocket] = useState(getSocket());
  const [children, setChildren] = useState([]);

  const addObject = (uid , name , position , type) => {
     setChildren((state) => [
       {
        obj: getPrimitiveObject(name,uid ),
         type: type,
         name: name,
         uuid: uid,
         position: [0, 0, 0],
       },
       ...state,
     ]);
  }

  const removeObject =(uid) => {
    setChildren((state) => state.filter((obj)=>obj.uuid != uid));
  }

  //listen for socket events
  useEffect(() => {
    const addobjecthandler = (data) => {
      const { name, uid, position , type } = data;
      console.log("object-added");
     addObject(uid , name , position , type)
    };

    const removeobjecthandler = (data) => {
      removeObject(data.uid)
    };

    socket.on("user-add-object", addobjecthandler);
    socket.on("user-remove-object", removeobjecthandler);

    return () => {
      socket.off("user-add-object", addobjecthandler);
      socket.off("remove-object", removeobjecthandler);
    };
  }, [socket]);

  console.log(children)

  return (
    <group ref={root} name="editorScene">
      <UIControlManager socket={socket}></UIControlManager>
      {/* <ZTransformControls objects={root.current}></ZTransformControls> */}
    <Table rotate={[0,0,0]} scale={[0.2 , 0.2 , 0.2]}></Table>
      {children.map((child, i) => {
        console.log(child.name)
        switch(child.type) {
          case "object":
            return <ControllableObject key={i} type={child.name} uuid={child.uuid}></ControllableObject>

          case "model":
            return;

          case "label":
            return
        }
        
      })}
    </group>
  );
}


function Table(props) {
  const { nodes, materials } = useGLTF(tablemodel);
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.phong1SG}
        />
      </group>
    </group>
  );
}
