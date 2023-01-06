import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebaseConfig";
import { createProfile, fetchAndSaveUserData, getUserDetails } from "./db";
import { getUserData, saveUserData } from "./localDataStorage";

const auth = getAuth(app);
var uid;

export const getUid = () => (uid ? uid : auth.currentUser.uid);

export const checkLoginStatus = (loggedIn, notLoggedIn) => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      loggedIn(user.uid);
      uid = user.uid;
    } else {
      // No user is signed in.
      notLoggedIn();
    }
  });
};

export const signUp = (
  username,
  email,
  password,
  confirmPassword,
  onSuccess,
  onError
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
      const user = userCred.user;

      createProfile(
        user.uid,
        username,
        email,
        (data) => {
          saveUserData({
            username: username,
            email: email,
            uid: user.uid,
          });

          onSuccess(data, uid);
        },
        (err) => {
          console.log(err);
          onError(err);
        }
      );
    })
    .catch((err) => {
      onError(err);
    });
};

export const login = (email, password, onSuccess, onError) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((usercred) => {
      const user = usercred.user;

      onSuccess(user);
      fetchAndSaveUserData(user.uid);

      console.log(getUserData());
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};

export const logOut = () => {
  window.localStorage.setItem("currentUID", "");
  auth.signOut();
};

//server
