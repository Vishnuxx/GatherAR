import { useLoader } from "react-three-fiber";
import { useGLTF, Html } from "@react-three/drei";
import maleAvatar from "../../../assets/Models/avatarMale.glb";
import femaleAvatar from "../../../assets/Models/avatarFemale.glb";
import { useEffect, useRef, useState } from "react";
import { EnabledMic } from "../../../GlobalComponents/EnabledMic";
import { DisbledMic } from "../../../GlobalComponents/DisabledMic";
import { useMemo } from "react";
import { getSocket } from "../../../Utilities/socketConnection";

export function Avatar({
  position,
  rotation,
  socketid,
  isMale,
  shirtColor,
  username
}) {
 

 
  return isMale ? (
    <Male
      name={username}
      position={position}
      rotation={rotation}
      shirtColor={shirtColor}
      nameid={socketid}
    />
  ) : (
    <Female
      name={username}
      position={position}
      rotation={rotation}
      nameid={socketid}
      shirtColor={shirtColor}
    />
  );
}

//to show names of participants on top of avatar also whether he is talking
function AvatarLabel({ name }) {
  const [isTalking, setTalking] = useState(true);
  const [isMicEnable, setMicEnable] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        color: "black",
        background: "white",
        borderRadius: "100px",
        padding: "5px",
        border: isTalking ? "3px solid #00cf60" : "none",
        userSelect: "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>{name}</p>
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "100px",
          background: isMicEnable ? "red" : "gray",
          marginLeft: "5px",
        }}
      ></div>
    </div>
  );
}

function Male({ position, rotation, shirtColor, name , nameid }) {
  const { nodes, materials } = useGLTF(maleAvatar);

  useMemo(() => {
    console.log(position)
    materials.Tshirt_Green.color.setHex(shirtColor);
  }, []);

  return (
    <group
      name={nameid}
      position={[...position]}
      rotation={[...rotation]}
      // dispose={null}
    >
      <Html position={[0, 1, 0]}>
        <AvatarLabel name={name} />
      </Html>

      <group position={[0, 0.46, 0]} scale={0.05}>
        <group position={[0, 39.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[0, -170.97, -32.72]}>
              <group position={[0.06, 110.36, 33.46]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_Tshirt_Green_0.geometry}
                  material={materials.Tshirt_Green}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_LightSkin_0.geometry}
                  material={materials.LightSkin}
                />
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Head_Hair_F_0.geometry}
                material={materials.Hair_F}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Head_LightSkin_0.geometry}
                material={materials.LightSkin}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Head_blinn1_0.geometry}
                material={materials.blinn1}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Head_phong1_0.geometry}
                material={materials.phong1}
              />
            </group>
          </group>
        </group>
      </group>
      <group position={[0.42, 0.47, 0.01]} scale={0.1} />
    </group>
  );
}

function Female({ position, rotation, shirtColor, name , nameid}) {
  const { nodes, materials } = useGLTF(femaleAvatar);

  useMemo(() => {
    materials.Tshirt_Green.color.setHex(shirtColor);
  }, []);

  return (
    <group
      name={nameid}
      position={[...position]}
      rotation={[...rotation]}
      // dispose={null}
    >
      <Html occlude position={[0, 1, 0]} as="div">
        <AvatarLabel name={name} />
      </Html>
      <group position={[0, 0.32, -0.02]} scale={0.2}>
        <group
          position={[-0.02, -31.96, -7.88]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.25}
        >
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group
              position={[0.01, 155.91, 36.84]}
              scale={[56.83, 58.77, 48.4]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Head_Skin_Colour_0.geometry}
                material={materials.Skin_Colour}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Head_Teeth_0.geometry}
                material={materials.Teeth}
              />
            </group>
            <group position={[0.06, 110.36, 33.46]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Body_Tshirt_Green_0.geometry}
                material={materials.Tshirt_Green}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Body_Skin_Colour_0.geometry}
                material={materials.Skin_Colour}
              />
            </group>
            <group
              position={[-7.07, 157.5, 46]}
              rotation={[1.53, -0.02, 0.28]}
              scale={[1.7, 0.65, 1.89]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Eye_R_phong1_0.geometry}
                material={materials.phong1}
              />
            </group>
            <group
              position={[6.62, 157.5, 46]}
              rotation={[1.52, 0, -0.27]}
              scale={[1.7, 0.65, 1.89]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Eye_L_phong1_0.geometry}
                material={materials.phong1}
              />
            </group>
            <group position={[0, 0.14, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Hair_Loft_Hair_F_0.geometry}
                material={materials.Hair_F}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
