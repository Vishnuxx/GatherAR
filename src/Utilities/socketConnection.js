import { io } from "socket.io-client";


let socket;

export const initSocket = (onSuccess = (socket)=>{}) => {
  socket = io(process.env.REACT_APP_SOCKET_URL);

  socket.on("connect", (id) => {
    onSuccess(socket)
    console.log("connected successfully" + id);
  });

  socket.on('receive-id' , (id)=>{
    console.log("my id is " + id)
  })
};


//actions

export const createRoom = (hostId) => {
    socket.emit("create-room" , {
        msg: 'hii'
    })

    socket.on("created" , (data)=>{
        console.log("room created" + data);
    })
}


//events

export const onDisconnect = (callback) => {
    socket.on("disconnect", () => {
      callback();
      console.log("disconnected successfully");
    });
}
