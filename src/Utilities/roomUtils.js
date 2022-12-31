const url = process.env.REACT_APP_SERVER_URL;

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  mode: "no-cors",
};

export const createRoom = (roomName ,uid , onSucces , onError) => {
  fetch("http://localhost:3000/" + "createroom/", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      uid: uid,
      roomname: roomName,
    }),
  })
    .then((data) => {
      if (data.status == 200) {
        console.log("createRoom success" + JSON.stringify(data));
        onSucces(data);
      } else {
        onError(data);
      }
    })
    .catch((err) => {
      onError(err);
    });
};
