import { participantsListState } from "./participantsState";
import {
  socketConnection,
  joiningLinkState,
  micState,
  peerConnection,
  roomDetails,
  userType,
} from "./roomState";

export const setPeerInitialized = (bool, peerid) => {
  peerConnection.isInitialized = bool;
  peerConnection.peerid = peerid;
};

export const setSocketInitialized = (bool, socketId) => {
  socketConnection.value = bool;
  socketConnection.socketId = socketId;
};

export const setUserType = (type) => {
  userType.value = type;
};

export const updateJoiningLink = (link) => {
  joiningLinkState.value = link;
};

export const enableMic = (bool) => {
  micState.isEnabled = bool;
};

export const setRoomAdmin = (adminId) => {
  roomDetails.value = adminId;
};

export const setRoomMembers = (membersobject) => {
  participantsListState.value = [
    ...Object.keys(membersobject).map((key) => {
      return membersobject[key];
    }),
  ];
};
