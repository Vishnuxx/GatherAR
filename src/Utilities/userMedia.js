import { APPROUTES } from "../AppConstants";

export const createJoiningLink = (roomId) => {
  return `https://${window.location.hostname}:${window.location.port}${APPROUTES.join}?id=${roomId}`;
};

export const getUserAudio = (onSuccess, onError) => {
  window.navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      onSuccess(stream);
    })
    .catch((error) => {
      onError(error);
    });
};
