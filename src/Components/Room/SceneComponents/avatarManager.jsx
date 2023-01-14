import { ZapparCamera } from "@zappar/zappar-react-three-fiber";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useSnapshot } from "valtio";
import {
  isListeningIncomingConnections,
  participantsListState,
} from "../../../State/participantsState";
import {
  getPeer,
  listenIncomingConnections,
} from "../../../Utilities/peerConnection";
import { getSocket } from "../../../Utilities/socketConnection";
import { Avatar } from "./Avatar";

export function AvatarManager() {
  
  const [remotePeers, setRemotePeers] = useState({});
  const [avatars , setAvatars] = useState([])

  const { camera } = useThree();
  const socket = useRef(getSocket()).current;
  const sceneRef = useRef()

  const addListOfAvatars = (participants) => {
    const members = {}
    Object.values(participants).map((member)=>{
      members[member.socketid] = {
        socketid: member.socketid,
        username: member.username,
        isTalking: false,
        transforms: {
          position: [0, 0, 0],
          rotation: [0, 0, 0],
        },
      };
    })
    setRemotePeers((prevState)=>({
      ...members,
      ...prevState
    }))
  };

  const addAvatar = (socketid, data) => {
    const { username, position, rotation } = data ;
    setRemotePeers((prevState) => ({
      [socketid]: {
        socketid: socketid,
        username: username,
        isTalking: false,
        transforms: {
          position: [...position],
          rotation: [...rotation],
        },
      },
      ...prevState,
    }));
   
  };

  const removeAvatar = (socketid) => {
    setRemotePeers((prevState) => {
       const copy = {...prevState}
       delete copy[socketid]
      return copy
    });
    // setAvatars([
    //   ...avatars,
    //   <Avatar
    //     username={username}
    //     position={position}
    //     rotation={rotation}
    //     socketid={socketid}
    //     isMale={true}
    //     shirtColor={0xff262626}
    //   ></Avatar>,
    // ]);
  };

  //when i join , add all member avatars
  useEffect(() => {
    socket.on("joined-room", (data) => {
      const { participants } = data;
      addListOfAvatars(participants);
      //addListOfAvatars(participants)
    });
  }, []);

  //listens remote connection
  useEffect(() => {
    //new user joined
    getSocket().on(
      "user-joined-room",
      (data) => {
        const { username, socketid, peerid } = data;

        addAvatar(socketid, {
          username: username,
          position: [1, 0, 1],
          rotation: [0, 0, 0],
        });
        // console.log(remotePeers);
      },

      []
    );

    const handler = (data) => {
      const { socketid, position, rotation } = data;
   
      const object = sceneRef.current?.getObjectByName(socketid)
      object?.position.set(position[0] , position[1] , position[2])
      object?.rotation.set(rotation[0] , rotation[1] , rotation[2])
    };
    socket.on("avatar-transform-update", handler);

    getSocket().on("user-left-room", (data) => {
      const { socketid } = data;
      // console.log("left avatar");
      removeAvatar(socketid);
    });
  }, []);

  return (
    <scene ref={sceneRef} position={[1,1,-2]}>
      {Object.values(remotePeers).map((peer, index) => {
        return (
          <Avatar
            key={index}
            username={peer.username}
            position={peer.transforms.position}
            rotation={peer.transforms.rotation}
            socketid={peer.socketid}
            isMale={true}
            shirtColor={0xff262626}
          ></Avatar>
        );
      })}
    
    </scene>
  );
}
