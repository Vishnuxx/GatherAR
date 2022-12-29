const peers = []



export const addPeer = (peerId , callback=()=>{}) => {
    peers = [...peers , {
        id: peerId
    }]
    callback();
}


export const removePeer = (peerId, callback = () => {}) => {
  peers = peers.filter((peer)=> peer.id != peerId)
  callback();
};
