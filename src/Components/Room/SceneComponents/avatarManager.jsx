import { ZapparCamera } from "@zappar/zappar-react-three-fiber";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useSnapshot } from "valtio";
import { isListeningIncomingConnections, participantsListState } from "../../../State/participantsState";
import {
  getPeer,
  listenIncomingConnections,
} from "../../../Utilities/peerConnection";
import { getSocket } from "../../../Utilities/socketConnection";
import { Avatar } from "./Avatar";

export function AvatarManager() {
  const [remotePeers, setRemotePeers] = useState([]);
  const { camera } = useThree();
  const socket = useRef(getSocket()).current;

  const addListOfAvatars = (participants) =>{
    const list = Object.keys(participants).map((obj) => ({
      socketid: participants[obj].socketid,
      username: participants[obj].username,
      transforms: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    }));

          console.log(';ist: ' , [...list, ...remotePeers]);
    setRemotePeers((prevState)=>[...list , ...remotePeers])
  }

  const addAvatar = (socketid, data) => {
    const { username, position, rotation } = data;
    setRemotePeers((prevState) => [ {
          socketid: socketid,
          username: username,
          isTalking: false,
          transforms: {
            position: position,
            rotation: rotation,
          },
        },
        ...prevState,
       
      ]
    );
  };

  const removeAvatar = (socketid) => {
    setRemotePeers((prevState)=>{
      return prevState.filter((peer)=>peer.socketid !== socketid)
    })
  };

  const updateAvatar = (data) => {
    const { socketid, position, rotation } = data;

    setRemotePeers((prevState)=>{
       return prevState.map((obj)=>{
        if(obj.socketid === socketid) {
          return {
            ...obj,
            "transforms": {
              position: position,
              rotation: rotation
            }
          }
        }
       })
    })
    
  };



  //when i join , add all member avatars
  useEffect(()=>{
    socket.on('joined-room' , (data)=>{
      const {participants} = data
      addListOfAvatars(participants)
      //addListOfAvatars(participants)
    })
  }, [])



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
      },
      []
    );

    getSocket().on("user-left-room", (data) => {
      const { socketid } = data;
      console.log("left avatar");
       removeAvatar(socketid);
    });
  }, []);


  //listens for avatar position updates
  useEffect(() => {
    socket.on("avatar-transform-update", (data) => {
      const { socketid, position, rotation } = data;
     
       updateAvatar(data);
      
    });
  }, []);



  return (
    <group>
      {Object.keys(remotePeers).map((key, index) => {
        const peer = remotePeers[key];
        return (
          <Avatar
            key={index}
            name={peer.username}
            position={[...peer.transforms.position]}
            rotation={[...peer.transforms.rotation]}
            isMale={true}
            shirtColor={0xff262626}
          ></Avatar>
        );
      })}
    </group>
  );
}
