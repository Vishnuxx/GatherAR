import Peer from "peerjs";

let peer;

const initPeer = (peerId, onReady) => {
  if (peerId) {
    peer = new Peer(peerId, { reconnect: false, debug: 2 });
    console.log(`my id is`);
  } else {
    peer = new Peer({reconnect: false , debug:2});
  }


  peer.on("open", onReady);
};

const getPeer = () => peer;

const onError = (callback) => {
  peer.on("error", (type) => {
    callback(type);
  });
};

const connectPeer = (id) => {
  peer.connect(id);
};

const listenIncomingConnections = (callback) => {
  peer.on("connection", (conn) => {
    callback(conn);
  });
};

const isPeedIdValid = (peerid) => {
  const validPeerIdRegex = /^[a-z0-9-]{1,16}$/;
  return validPeerIdRegex.test(peerid);
};

const endConnection = () => {
  peer.close();
};

const onCloseSession = (callback) => {
  peer.on("close", () => {
    callback();
  });
};

const onPeerDisconnected = (callback) => {
  peer.on("disconnected", () => {
    callback();
  });
};

const reconnect = () => {
  peer.reconnect();
};

const callPeer = (remotePeerId , stream) => {
  peer.call(remotePeerId ,stream);
};

const callPeers = (remoteIdList , mystream) => {
  remoteIdList.map((id)=>{
    callPeer(id  ,  mystream)
  })
}

const listenIncomingCalls = (callback) => {
  peer.on("call", (call) => {
    callback(call);
  });
};

const destroyPeer = () =>{
  peer.destroy()
}

export {
  initPeer,
  getPeer,
  listenIncomingConnections,
  listenIncomingCalls,
  isPeedIdValid,
  connectPeer,
  onError,
  callPeer,
  endConnection,
  reconnect,
  onPeerDisconnected ,
  onCloseSession,
  destroyPeer
};
