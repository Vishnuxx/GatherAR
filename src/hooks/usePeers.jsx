import Peer from "peerjs";
import { useState } from "react";

export function usePeers() {
    const [peers, setPeers] = useState([]);

    function connectPeer(peerid , {onOpen , onConnect , }) {
        const p = new Peer(null , { reconnect: false, debug: 2 });
        var conn = p.connect("another-peers-id");
        // on open will be launch when you successfully connect to PeerServer
        conn.on("open", function () {
          // here you have conn.id
          conn.send("hi!");
        });
    }
}