import { io } from "socket.io-client";
import {
  getAuth,
} from "firebase/auth";


let socket = null;
let currentRoomId = null;
let uid = null;

export const initSocket = (onSuccess = (socket) => {}, onError) => {
  // console.log("init socket");
  try {
    socket = io.connect(process.env.REACT_APP_SOCKET_URL );
   
    socket.on("connect", (socketid) => {
      uid = getAuth().currentUser.uid
      onSuccess(socket);
      console.log("connected successfully" + socket.id);
    });
  } catch (e) {
    onError(e)
  }
};

//cretation

export const createRoom = ({ uid, username, roomname  }) => {
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

export const roomAlreadyExist = (callback)=>{
  socket.on("room-already-exists" , (data)=>{
    callback(data)
  })
}

//joining

export const joinRoom = (roomid , username) => {
  socket.emit("join-room", {
    roomid: roomid,
    uid : uid , 
    username : username,
  });
};

//when i join the room 
export const onJoined = (callback) => {
  socket.on("joined-room", (data) => {
    // {roomadmin , participants , roomname} = data
    callback(data);
    currentRoomId = data.roomid;
  });
};



//when others are joined
export const onUserJoined = (callback) => {
  socket.on("user-joined-room", (data) => {
    // {username , usersUid} = data
    callback(data);
  });
};

export const roomNotExist = (callback) => {
  socket.on("room-not-exist", (data) => {
    // {roomadmin , participants , roomname} = data
    callback(data);
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

export const sendStream = (stream) => {
  socket.emit("send-stream", {
    senderid: socket.id,
    roomid: currentRoomId,
    stream: stream,
  });
};

export const onReceiveStream = (callback) => {
  socket.on("receive-stream", (data) => {
    // {senderid , stream} = data
    callback(data);
  });
};

export const leaveRoom = () => {
  socket.emit("leave-room", {
    roomid: currentRoomId,
  });
};

export const onLeftRoom = (callback) => {
  socket.on("left-room", (data) => {
    callback(data);
    currentRoomId = null;
  });
};

export const onDisconnect = (callback) => {
  socket.on("disconnect", () => {
    callback();
    console.log("disconnected successfully");
  });
};
