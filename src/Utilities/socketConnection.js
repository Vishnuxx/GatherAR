import { io } from "socket.io-client";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";

let socket = null;
let currentRoomId = null;
let uid = null;

export const initSocket = (onSuccess , onError) => {
  // console.log("init socket");
  try {
    socket = io.connect(process.env.REACT_APP_SERVER_URL, {
      path: "/socket.io/",
    });

    socket.on("connect", (socketid) => {
      onSuccess(socket);
      console.log("connected successfully" + socket.id);
    });

    
  } catch (e) {

    onError(e);
  }
};

export const getSocket = ()=> socket

//cretation

export const createRoom = ({ uid, username, roomname }) => {
  socket.emit("create-room", {
    uid: uid,
    roomname: roomname,
    username: username,
  });
};

export const onRoomCreated = (callback) => {
  socket.on("room-created", (data) => {
    // {roomid} = data
    callback(data);
    currentRoomId = data.roomid;
  });
};

export const roomAlreadyExist = (callback) => {
  socket.on("room-already-exists", (data) => {
    callback(data);
  });
};

//joining

export const joinRoom = (roomid, socketid ,  username , peerid) => {
  
  socket.emit("join-room", {
    roomid: roomid,
    socketid: socketid,
    username: username,
    peerid: peerid,
  });
};

//when i join the room
export const onJoined = (callback) => {
  socket.on("joined-room", (data) => {
    // {roomadmin , participants , roomname , peerid} = data
    
    callback(data);
    currentRoomId = data.roomid;
  });
};

//when others are joined
export const onUserJoined = (callback) => {
  socket.on("user-joined-room", (data) => {
    // {username , socketid , peerid} = data
    callback(data);
  });
};

export const roomNotExist = (callback) => {
  socket.on("room-not-exist", () => {
    callback();
  });
};

// export const onErrorJoining = (callback) => {
//   socket.on("error-joining", (data) => {
//     // {message} = data
//     callback(data);
//   });
// };

//messaging

export const sendMessage = (message) => {
  socket.emit("send-message", {
    senderid: socket.id,
    roomid: currentRoomId,
    message: message,
  });
};

export const onReceiveMessage = (callback) => {
  socket.on("receive-message", (data) => {
    // {senderid , message } = data
    callback(data);
  });
};

export const sendAudioData = (audiodata) => {
  socket.emit("send-audio", {
    stream: audiodata,
    uid: uid,
  });
};

export const onReceiveAudioData = (callback) => {
  socket.on("receive-audio", (audiodata) => {
    // {senderid , stream} = data
    callback(audiodata);
  });
};

export const leaveRoom = () => {
  socket.emit("leave-room", {
    roomid: currentRoomId,
  });
};

export const onUserLeftRoom = (callback) => {
  socket.on("user-left-room", (data) => {
    //{ socketid } = data
    callback(data);
    currentRoomId = null;
  });
};

export const onSocketDisconnect = (callback) => {
  socket.on("disconnect", () => {
    callback();
    console.log("disconnected successfully");
  });
};
