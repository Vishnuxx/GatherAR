import { useEffect } from "react";
import { showLoading } from "../../../State/appActions";
import {
  setPeerInitialized,
  setSocketInitialized,
} from "../../../State/roomActions";

import {
  initPeer,
  onPeerDisconnected,
} from "../../../Utilities/peerConnection";

import {
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
    showLoading(true);
    //initialize socket connection
    initSocket(
      (socket) =>  setSocketInitialized(true, socket.id),
      (e) => setSocketInitialized(false, null)
    );

    //initialize peer connection
    initPeer(null, (peerid) => setPeerInitialized(true, peerid));
    
  }, []);




  return <></>;
}
