
const USERTYPE = {
    'HOST':1,
    'PARTICIPANT':2,

}



const isUndefinedHost = (locationObject) => {
  return (
    locationObject.state == undefined ||
    locationObject.state == null ||
    ![USERTYPE.HOST, USERTYPE.PARTICIPANT].includes(
      locationObject.state.userType
    )
  );
};

const isHost = (locationObject) => {
  return locationObject.state.userType === USERTYPE.HOST;
};

const isParticipant = (locationObject) => {
  return locationObject.state.userType === USERTYPE.PARTICIPANT;
};


export { isHost, isParticipant, isUndefinedHost , USERTYPE};