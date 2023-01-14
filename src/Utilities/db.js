import {
  getDatabase,
  set,
  ref,
  onValue,
  push,
  remove,
  get,
  child,
  orderByKey,
  equalTo,
  orderByChild,
  
} from "firebase/database";
import { getAuth } from "firebase/auth";
import {getStorage, uploadBytes} from "firebase/storage"
import app from "../firebaseConfig";
import { getUserData, saveUserData } from "./localDataStorage";
import { showLoading } from "../State/appActions";
import { endAt, limitToLast, startAt } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

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

export const fetchAndSaveUserData = (uid, onSuccess) => {
  onValue(
    ref(db, process.env.REACT_APP_USER_PROFILES_PATH + uid),
    (snapshot) => {
      const data = snapshot.val();
      
      if (data.myrooms == undefined || data.myrooms == null) {
       
        const userdata = {
          username: data.username,
          email: data.email,
          uid: uid,
          rooms: [],
        };
        saveUserData(userdata);
        onSuccess(userdata);
      } else {
         const rooms = [...Object.keys(data.myrooms).map((key) => key)];
        getMyRooms(
          rooms,
          (rooms) => {
            const userdata = {
              username: data.username,
              email: data.email,
              uid: uid,
              rooms: rooms,
            };
            saveUserData(userdata);
            onSuccess(userdata);
          },
          (err) => {
            console.log(err);
            showLoading(false);
          }
        );
      }
      

    
      return;
    },
    {
      onlyOnce: true,
    }
  );
};

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

export const getMyRooms = async (roomsList, onSuccess, onError) => {
  const query = await ref(
    db,
    "/rooms/",
    // orderByKey(startAt([0]), endAt(roomsList[roomsList.length - 1]))

  );

  get(query).then(
    (snapshot) => {
      const data = snapshot.val();
    
      const rooms = Object.keys(data).filter((roomid) => roomsList.includes(roomid)).map((roomid)=>{
        return {
          id: roomid,
          ...data[roomid]
        }
      });

    
      console.log(rooms)
      
      onSuccess(rooms);
    },
    (e) => {
      onError(e);
    }
  );
};



//storage
export const uploadModel = (uid , roomid , filename ,  file , onSuccess , onFailure) => {
  const storage = getStorage(app)
  const storageref = ref(storage, `/models/${uid}/${filename}`);

  uploadBytes(storageref, file)
    .then((snapshot) => {
      console.log("Uploaded a blob or file!");
      const url = snapshot.ref.getDownloadUrl()
      addDownloadUrlToRoom(filename , url , roomid , onSuccess , onFailure)
    })
    .catch(onFailure);

}


//database
export const addDownloadUrlToRoom = (filename , fileUrl , roomid , onSuccess , onFailure) =>{
  set(ref(db , `/rooms/${roomid}/assets/${uuidv4()}` , {
    name: filename,
    url: fileUrl
  })).onSuccess(onSuccess).catch(onFailure)
}


export const getAssetsOfRoom = (roomid , success , error) => {
  get(ref(db ,`/rooms/${roomid}/assets/` )).then(success).catch(error)
}