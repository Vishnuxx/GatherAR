import {
  getDatabase,
  set,
  ref,
  onValue,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";

const db = getDatabase(app);
const auth = getAuth(app);



export const getUserDetails = (onSuccess, onError) => {
  const userdetails = ref(
    db,
    process.env.REACT_APP_USER_DB_PATH + auth.currentUser.uid
  );
  onValue(
    userdetails,
    (snapshot) => {
      const data = snapshot.val();
      onSuccess(data);
    },
    (error) => {
      onError(error);
    }
  );
};


const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  mode: "no-cors",
};

const ROUTES = ["createprofile"];

export const createProfile = (userId, username, email, onSuccess, onError) => {
  const response = fetch("http://localhost:3000/" + "createprofile", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      uid: userId,
      username: username,
      email: email,
    }),
  })
    .then((data) => {
      console.log("profile creation success" + JSON.stringify(data.body));
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};