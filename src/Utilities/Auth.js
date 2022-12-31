import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebaseConfig";
import { createProfile } from "./db";


const auth = getAuth(app);

export const checkLoginStatus = (loggedIn, notLoggedIn) => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      loggedIn(user.uid);
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
          onSuccess(data);

          localStorage.setItem("user", {
            name: username,
            email: email,
            uid: user.uid,
          });
        },
        (err) => {
          console.log(err);
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
      localStorage.setItem('user' , {
        name : user.email ,
        email: email , 
        uid: user.uid
      })
      onSuccess(user);
    })
    .catch((e) => {
      onError(e);
    });
};



export const logOut = () => {
  localStorage.setItem("currentUID", "");
  auth.signOut();
};






//server 
