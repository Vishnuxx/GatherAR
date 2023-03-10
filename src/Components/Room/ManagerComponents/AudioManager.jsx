import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { isListeningIncomingConnections } from "../../../State/participantsState";
import { enableMic } from "../../../State/roomActions";
import {
  micState,
  peerConnection,
  socketConnection,
} from "../../../State/roomState";
import {
  getPeer,
  listenIncomingCalls,
} from "../../../Utilities/peerConnection";
import { getSocket } from "../../../Utilities/socketConnection";
import { getUserAudio } from "../../../Utilities/userMedia";

export function AudioManager() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const mic = useSnapshot(micState);
  const peerconnection = useSnapshot(peerConnection);
  const socketconnection = useSnapshot(socketConnection);
  const [usermedia, setusermedia] = useState();

  

 
 

  //initialises usermedia stream
  useEffect(() => {
   enableMic(false)
    getUserAudio(
      (stream) => {
        setLocalStream(stream);
      },
      (error) => console.log("failed to access mic")
    );

    return () =>{
    localStream
      ?.getAudioTracks()
      .forEach((track) => (track.enabled.stop()));

      
    }
  }, []);

  //mute and unmute based on mic state
  useEffect(() => {
    const isMicEnabled = mic.isEnabled;
    // console.log("mic enabled: ", isMicEnabled);
    localStream?.getAudioTracks().forEach((track) => (
      track.enabled = isMicEnabled
    ));

   
  }, [mic]);


// const peers = []
//   useEffect(()=>{
    
//     getSocket().on("join-room",(data)=>{
//       const {username , socketid , peerid} = data
//       const handler = () => {
//         const peer = new Peer({ reconnect: true });
//         peers = [...peers, peer];
//         peer.on("open", (id) => {
//           peer.call(peerid, localStream).on("stream",(remotestream)=>{
//             setRemoteStreams({ ...remoteStreams, remotestream });
//           })
//         });
//       };
//     })
    
//   },[localStream])



  // //when i join
  useEffect(() => {
    const handler = (data) => {
      if (localStream != null) {
        const { roomadmin, participants, roomname, peerid } = data;
        Object.values(participants).map((member, i) => {
       
          getPeer()
            .call(member.peerid, localStream)
            .on("stream", (stream) => {
              setRemoteStreams([...remoteStreams, stream]);
            });
       
         
        });
      }
    };
    getSocket().on("joined-room", handler);
    return () => getSocket().off("joined-room", handler);
  }, [localStream]);

  //listen for call accept
  useEffect(() => {
    const handler = (call) => {
      call.answer(localStream);
      call.on("stream", (stream) => {
        setRemoteStreams([...remoteStreams, stream]);
        // console.log("call-from-is-answered", stream);
      });
    };

    getPeer().on("call", handler);

    return () => getPeer().off("call", handler);
  }, [localStream]);

//   //when new user joins
//   useEffect(()=>{
//     const handler = (data)=>{
//       const { username, socketid, peerid } = data;
//       const call =  getPeer()
//         .call(peerid, localStream)
//         call.on("stream", (stream) => {
//           setRemoteStreams([...remoteStreams, stream]);
//         });
//     }
//     getSocket().on('user-joined-room',handler);

//     return ()=> getSocket().off("user-joined-room", handler);

// },[localStream])


  // //handle disconnecions
  // useEffect(() => {
  //   const disconnect = (conn) => {
  //     console.log(`Peer ${conn.peer} audio has been disconnected`);
  //     setRemoteStreams(
  //       remoteStreams.filter((stream) => stream !== conn.remoteStream)
  //     );
  //   };

  //   const close = (conn) => {
  //     console.log(`Connection to peer ${conn.peer} closed`);
  //     setRemoteStreams(
  //       remoteStreams.filter((stream) => stream !== conn.remoteStream)
  //     );
  //   };

  //   getPeer().on("disconnect", disconnect);
  //   getPeer().on("close", close);

  //   return () => {
  //     getPeer().off("disconnect", disconnect);
  //     getPeer().off("close", close);
  //   };
  // }, []);

  return (
    <>
      {remoteStreams.map((stream, index) => {
        return <Audio key={{ index }} stream={stream}></Audio>;
      })}
    </>
  );
}

function Audio({ stream }) {
  const ref = useRef();
  useEffect(() => {
    ref.current.srcObject = stream;
  }, []);
  return <audio autoPlay={true} ref={ref} />;
}




