import {
  getDatabase,
  set,
  ref,
  onValue,
  push,
  remove,
  get,
  child,
  
} from "firebase/database";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";
import { getUserData, saveUserData } from "./localDataStorage";

const db = getDatabase(app);
const auth = getAuth(app);



// export const getUserDetails = (uid , onSuccess, onError) => {
//   const userdetails = ref(
//     db,
//     process.env.REACT_APP_USER_PROFILES_PATH + uid
//   );

//   // userdetails.once("value", (snapshot) => {
//   //   // do some stuff once
//   // });
//   get(
//     userdetails,
//     (snapshot) => {
//       console.log("trigger................")
//       const data = snapshot.val();
//       console.log(data);
//       onSuccess(data);
//     },
//     (error) => {
//       onError(error);
//     }
//   );
// };


export const fetchAndSaveUserData = (uid) =>{

  onValue(
    ref(db, process.env.REACT_APP_USER_PROFILES_PATH+uid),
    (snapshot) => {
      const data = snapshot.val()
      console.log(data)
      saveUserData({
        username: data.username,
        email : data.email,
        uid : uid
      })
      console.log(getUserData())
    },
    {
      onlyOnce: true,
    }
  );

}


const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const ROUTES = ["createprofile"];

export const createProfile = (userId, username, email, onSuccess, onError) => {
  const response = fetch(process.env.REACT_APP_SERVER_URL + "createprofile", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      uid: userId,
      username: username,
      email: email,
    }),
  })
    .then((data) => {
      console.log("profile creation success" + "createprofile");
      onSuccess(data);
    })
    .catch((err) => {
       window.alert(err + process.env.REACT_APP_SERVER_URL);
      onError(err);
    });
};