import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { isListeningIncomingConnections } from "../../../State/participantsState";
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

  function checkVolume(threshold, stream) {
    // Create an audio context and set the MediaStream as the source
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    // Create an analyser node
    const analyser = audioContext.createAnalyser();

    // Connect the source to the analyser node
    source.connect(analyser);

    // Connect the analyser node to the audio context's destination
    // analyser.connect(audioContext.destination);

    // Set up the time domain data array
    const data = new Uint8Array(analyser.fftSize);

    // Create a function to check the volume
    function check() {
      // Get the time domain data from the analyser node
      analyser.getByteTimeDomainData(data);

      // Calculate the average volume
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i] ** 2;
      }
      const rms = Math.sqrt(sum / data.length);
      const volume = rms / 256;

      // Return true if the volume is higher than the threshold
      // if (volume > threshold) {
      //   return true;
      // } else {
      //   return false;
      // }
     
      return analyser.getByteFrequencyData(data);
    }

    return check();
  }

  //initialises usermedia stream
  useEffect(() => {
    getUserAudio(
      (stream) => {
        setLocalStream(stream);
        // setInterval(() => {
        //   console.log(checkVolume(0.3, stream));
        // }, 500);
      },
      (error) => console.log("failed to access mic")
    );
  }, []);

  //mute and unmute based on mic state
  useEffect(() => {
    const isMicEnabled = mic.isEnabled;
    console.log("mic enabled: ", isMicEnabled);
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = isMicEnabled;
      });
    }
  }, [mic.isEnabled]);

  //when i join
  useEffect(() => {
    getSocket().on("joined-room", (data) => {
      if (localStream != null) {
        const { roomadmin, participants, roomname, peerid } = data;
        Object.keys(participants).map((key, i) => {
          const member = participants[key];
          const call = getPeer().call(member.peerid, localStream);
          console.log("call peer: ", member.username);
          call.on("stream", (stream) => {
            setRemoteStreams([...remoteStreams, stream]);
          });
        });
      }
    });
  }, [localStream]);

  //call new joined users
  useEffect(() => {
    if (localStream != null) {
      getSocket().on("user-joined-room", (data) => {
        // const { username, socketid, peerid } = data;
        // const call = getPeer().call(peerid, localStream);
        // call.on("stream", (stream) => {
        //   setRemoteStreams([...remoteStreams, stream]);
        // });
        // console.log("call-new-peer", peerid, localStream);
      });
    }
  }, [localStream]);

  //listen for call accept
  useEffect(() => {
    getPeer().on("call", (call) => {
      call.answer(localStream);
      call.on("stream", (stream) => {
        setRemoteStreams([...remoteStreams, stream]);
        console.log("call-from-is-answered", stream);
      });
    });
    // console.log("call is addd");
    // const handleCall = (call) => {
    //   console.log("localstream : ", localStream);
    //   call.answer(localStream);
    //   call.on("stream", (stream) => {
    //     console.log("call-from-is-answered", stream);
    //     setRemoteStreams([...remoteStreams, stream]);
    //   });
    // };
    // getPeer().on("call", handleCall );
    // return ()=>getPeer().off('call' , handleCall)
  }, [localStream]);

  useEffect(() => {
    console.log("remote streams", remoteStreams);
  }, [remoteStreams]);
  //handle disconnecions
  useEffect(() => {
    const disconnect = (conn) => {
      console.log(`Peer ${conn.peer} audio has been disconnected`);
      setRemoteStreams(
        remoteStreams.filter((stream) => stream !== conn.remoteStream)
      );
    };

    const close = (conn) => {
      console.log(`Connection to peer ${conn.peer} closed`);
      setRemoteStreams(
        remoteStreams.filter((stream) => stream !== conn.remoteStream)
      );
    };

    //on disconnect
    getPeer().on("disconnect", disconnect);

    //on close
    getPeer().on("close", close);

    return () => {
      getPeer().off("disconnect", disconnect);
      getPeer().off("close", close);
    };
  }, []);

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
