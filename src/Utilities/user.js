


const user = {
    myRooms: [
        {
            id: "id",
            isHost: true,

        }
    ],

    joinedRooms: [
        {
            id:"id"
        }
    ]
}



const createRoom = (roomName, roomId , isMale) => {
    user["myRooms"].push({
      roomId: roomId,
      roomName: roomName,
      isMale: isMale,
    });
}

const deleteRoom = (roomId) => {
    user["myRooms"] = user["myRooms"].filter((room)=> room.id !== roomId);
}


const joinRoom = (roomId) => {
    user["joinedRooms"].push({
      id: roomId,
    });
}


const generateSharingLink = ( peerId) => {
    return `https://${window.location.hostname}:${window.location.port}/join?id=${peerId}`
}



export { createRoom, deleteRoom, joinRoom, generateSharingLink };