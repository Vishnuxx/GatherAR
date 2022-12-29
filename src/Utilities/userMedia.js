var isMuted = true;

export const getUserAudio = (
  onSuccess = (stream) => {},
  onError = () => {}
) => {
     
        
  window.navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
        console.log('er')
        if(!isMuted) {
            onSuccess(stream);
        }
      
    })
    .catch((error) => {
      onError(error);
      
    });
};

export const setAudioMuted = (bool , callback = ()=>{}) =>{
    isMuted = bool;
    callback()
}