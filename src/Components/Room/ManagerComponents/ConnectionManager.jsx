import { useEffect } from "react";
import { showLoading } from "../../../State/appActions";
import {
  setPeerInitialized,
  setSocketInitialized,
} from "../../../State/roomActions";

import {
  destroyPeer,
  getPeer,
  initPeer,
  onPeerDisconnected,
} from "../../../Utilities/peerConnection";

import {
  destroySocket,
  initSocket,
  onSocketDisconnect,
} from "../../../Utilities/socketConnection";

import { useSnapshot } from "valtio";
import { peerConnection, socketConnection } from "../../../State/roomState";

//handles connection and disconnection events

export function ConnectionManager() {
  const peerconnection = useSnapshot(peerConnection);
  const socketconnection = useSnapshot(socketConnection);

  //initialise socket and peer connection
  useEffect(() => {
     console.log("init");
    showLoading(true);
    //initialize socket connection
    initSocket(
      (socket) =>  setSocketInitialized(true, socket.id),
      (e) => setSocketInitialized(false, null)
    );

    //initialize peer connection
    initPeer(null, (peerid) => {
      setPeerInitialized(true, peerid)
      console.log('my-peerid is: ' , peerid)
    });
    

    return ()=>{
      // console.log("destroyed")
      destroyPeer()
      destroySocket()
    }
  }, []);




  return <></>;
}
