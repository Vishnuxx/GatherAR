import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import app from "../firebaseConfig";

const auth = getAuth();

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
      onSuccess(user);

      addUser(user.uid, {
        username: username,
        email: email,
      });
    })
    .catch((err) => {
      onError(err);
    });
};

export const login = (email, password, onSuccess, onError) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((usercred) => {
        const user = usercred.user
        onSuccess(user)
    })
    .catch((e) => {
        onError(e)
    });
};

const addUser = (userId, data) => {
  const database = getDatabase();

  set(ref(database, "users/" + userId), data);
};

export const logOut = () => {
  auth.signOut();
};
