import Peer from "peerjs";

let peer;

const initPeer = (peerId , onReady = (id) => {}) => {
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

const listenConnections = (callback = (conn)=>{}) => {
    peer.on("connection", (connection) => {
      callback(connection);
    });
}

export { initPeer, listenConnections };
