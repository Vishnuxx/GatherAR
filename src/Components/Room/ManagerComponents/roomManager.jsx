import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showLoading } from "../../../State/appActions";
import {
  setPeerInitialized,
  setRoomAdmin,
  setRoomMembers,
  setSocketInitialized,
  updateJoiningLink,
} from "../../../State/roomActions";
import { socketConnection, peerConnection, isAdmin, roomDetails, joiningLinkState } from "../../../State/roomState";
import { getUid } from "../../../Utilities/Auth";
import { getUserDetails } from "../../../Utilities/db";
import { isHost, isParticipant } from "../../../Utilities/hostValidation";
import { getUserData } from "../../../Utilities/localDataStorage";

import {
  createRoom,
  getSocket,
  joinRoom,
  onJoined,
  onRoomCreated,
  onSocketDisconnect,
  onUserJoined,
  onUserLeftRoom,
  roomAlreadyExist,
  roomNotExist,
} from "../../../Utilities/socketConnection";
import { createJoiningLink } from "../../../Utilities/userMedia";
import { useSnapshot } from "valtio";
import { APPROUTES } from "../../../AppConstants";
import { getPeer } from "../../../Utilities/peerConnection";
import {
  addMember,
  listenIncomingParticipantConnections,
  removeMember,
} from "../../../State/participantsActions";

export function RoomManager({ location }) {
  const navigate = useNavigate();
  const user = getUserData();
  const socketInitialized = useSnapshot(socketConnection);
  const peerInitialized = useSnapshot(peerConnection);

  useEffect(() => {
    //both socket and peer initialized
    const { username, roomname, uid } = location.state;

    if (socketInitialized.value && peerInitialized.isInitialized) {
      const socketId = socketInitialized.socketId;
      const peerId = peerInitialized.peerid;

      
      //for host
      if (isHost(location)) {
       
        createRoom({
          uid: uid,
          roomname: roomname,
          username: username,
          peerid: peerId,
        });

        //when room creted
        onRoomCreated((data) => {
          // console.log("room created:  ", createJoiningLink(data.roomid));
          updateJoiningLink(createJoiningLink(data.roomid));
          //joins the room
          // console.log('joinroom')
          joinRoom(data.roomid, socketId, username, peerId);
        });

        //when room already exists
        roomAlreadyExist((data) => {
          window.alert("room already exists");
          // console.log("room exists");
        });
      }

      if (isParticipant(location)) {
        
        const { roomId } = location.state;
        joinRoom(roomId, socketId, username, peerId);
        joiningLinkState.value = createJoiningLink(roomId)
        showLoading(false);
      }

      //when i joined
      onJoined((data) => {
        const { roomadmin, participants, roomname } = data;
      
        //check if he is roomadmin
        if (![undefined, null].includes(getUid()) && getUid() === roomadmin) {
          isAdmin.value = true;
          
        }
        setRoomAdmin(roomadmin);
        setRoomMembers(participants);
        listenIncomingParticipantConnections(true);
        showLoading(false);
      });

      //when a user joined
      onUserJoined((data) => {
        const { username, userid, peerid } = data;
        // console.log("new user peerid : ", peerid);
        addMember({
          membername: username,
          memberid: userid,
          peerid: peerid,
        });
        // console.log(getPeer())
      });

      //when a user leaves
      onUserLeftRoom((data) => {
        const { socketid } = data;

        //remove the connections of that member
        removeMember({
          membersocketid: socketid,
        });
        // console.log("user-left");
      });

      //when i disconnect
      onSocketDisconnect(() => {
        //close peerconnection
        //go to home
        // console.log("i have disconnected");
      });

      //when invalid roomid given
      getSocket().on("invalid-roomid", () => {
        alert("invalid room id");
        navigate(APPROUTES.join, {
          message: "room doesnt exist",
          replace: true,
        });
      });

      //when room doesnt exist
      roomNotExist(() => {
        showLoading(false);
        alert("Room doesnt exist");
        // console.log("room not exist");
        navigate(APPROUTES.join, {
          message: "room doesnt exist",
          replace: true,
        });
      });
    }

    return ()=>{
      // getSocket().disconnect();
      // console.log('discp')
    }
  }, [peerInitialized, socketInitialized]);
  return <></>;
}
