import Peer from "peerjs";

let peer;

const initPeer = (peerId, onReady = (id) => {}) => {
  if (peerId) {
    peer = new Peer(peerId);
    console.log(`my id is`);
  } else {
    peer = new Peer();
  }

  peer.on("open", (id) => {
    onReady(id);
  });


};


const callPeer = (remoteId) => {
  peer.call(remoteId);
};


const listenIncomingCalls = (callback) => {
  peer.on("call", (call) => {
    callback(call);
  });
};


const onError = (callback) => {
  peer.on("error", (type) => {
    callback(type);
  });
};


const connectPeer = (id) => {
  peer.connect(id);
};


const listenIncomingConnections = (callback) => {
  peer.on("connection", (call) => {
    callback(call);
  });
};


const isPeedIdValid = (peerid) => {
  const validPeerIdRegex = /^[a-z0-9-]{1,16}$/;
  return validPeerIdRegex.test(peerid);
};

const endConnection = () => {
    peer.close()
}

const onCloseSession = (callback) => {
    peer.on("close" , () => {
        callback();
    })
}

const onDisconnected = (callback) => {
    peer.on("disconnected", () => {
      callback();
    });
}

const reconnect = ()  => {
    peer.reconnect()
}





export {
  initPeer,
  listenIncomingConnections,
  listenIncomingCalls,
  isPeedIdValid,
  connectPeer,
  onError,
  callPeer,
  endConnection,
  reconnect,
  onDisconnected,
  onCloseSession,
};
