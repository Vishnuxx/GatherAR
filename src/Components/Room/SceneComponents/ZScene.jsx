import { useEffect, useRef, useState } from "react";
import { Group, Scene } from "three";
import { isDeletable, transformModeState } from "../../../State/SceneState";
import { getSocket } from "../../../Utilities/socketConnection";
import { ControllableObject } from "./Controls/ControllableObject";
import { UIControlManager } from "./Controls/UIControlManager";
import { ZTransformControls } from "./Controls/ZTransformControls";
import { Primitive } from "./SceneUtils/Primitive";
import { getPrimitiveObject } from "./SceneUtils/primitiveObjects";
import tablemodel from "../../../assets/Models/low_poly_table.glb";
import {
  Select,
  TransformControls,
  useCamera,
  useGLTF,
} from "@react-three/drei";
import { useSnapshot } from "valtio";
import { transformcontrol } from "./ZCanvas";
import { StrictMode } from "react";
import { useThree } from "react-three-fiber";
import { ModelLoader } from "./Controls/ModelLoader";
import { StoryBoard } from "./Controls/StoryBoard";
import { PaintBoard } from "./Controls/PaintBoard";
import { Browser } from "./Controls/Browser";
import { ControllableModel } from "./Controls/ControllableModel";

export function ZScene() {
  const root = useRef();
  const [socket, setsocket] = useState(getSocket());
  const [children, setChildren] = useState([]);

  //add object state
  const addObject = (uid, name, position, type) => {
    setChildren((state) => [
      ...state,
      {
        // obj: getPrimitiveObject(name, uid),
        type: type,
        name: name,
        uuid: uid,
        position: [0, 0, 0],
      },
    ]);

    isDeletable.value = false;
    isDeletable.uuid = null;
  };

  //remove object state
  const removeObject = (uid) => {
    setChildren((state) => state.filter((obj) => obj.uuid != uid));
    isDeletable.value = false;
    isDeletable.uuid = null;
  };

  //object add
  useEffect(() => {
    const addobjecthandler = (data) => {
      const { name, uid, position, type } = data;
      console.log("object-added");
      addObject(uid, name, position, type);
    };
    socket.on("user-add-object", addobjecthandler);
    return () => {
      socket.off("user-add-object", addobjecthandler);
    };
  }, [socket]);

  //object remove handler
  useEffect(() => {
    const removeobjecthandler = (data) => {
      removeObject(data.uid);
    };
    socket.on("user-remove-object", removeobjecthandler);
    return () => socket.off("remove-object", removeobjecthandler);
  }, [socket]);

  return (
    <StrictMode>
      <UIControlManager socket={socket}></UIControlManager>
      <scene ref={root} scale={[1.5,1.5,1.5]}>
        <group name="editorScene">
          {children.map((child, i) => {
            console.log(child.name);
            switch (child.type) {
              case "object":
                return (
                  <ControllableObject
                    key={i}
                    type={child.name}
                    uuid={child.uuid}
                  ></ControllableObject>
                );

              case "model":
                return (
                  <ControllableModel
                    key={i}
                    type={child.name}
                    uuid={child.uuid}
                  ></ControllableModel>
                );

              case "storyboard":
                return <StoryBoard key={i} uuid={child.uuid}></StoryBoard>;
              case "paintboard":
                return <PaintBoard key={i} uuid={child.uuid}></PaintBoard>;
              case "browser":
                return <Browser key={i} uuid={child.uuid}></Browser>;
              default:
                break;
            }
          })}
        </group>
        {/* <ModelLoader
          url={
            "https://firebasestorage.googleapis.com/v0/b/gatherar-6ff8b.appspot.com/o/models%2FBox.glb"
          }
          uuir={"we"}
        ></ModelLoader> */}
      </scene>
    </StrictMode>
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
