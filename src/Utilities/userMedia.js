var isEnabled = false;

export const getUserAudio = (
  onSuccess = (stream) => {},
  onError = () => {}
) => {
  navigator.mediaDevices
    .getUserMedia({ audio: isEnabled })
    .then((stream) => {
      stream.getTracks().forEach((track) => (track.enabled = isEnabled));
      onSuccess(stream);
    })
    .catch((error) => {
      onError(error);
    });
};

export const setUserAudioEnabled = (bool) =>{
    isEnabled = bool;
}