import { isListeningIncomingConnections, participantsListState } from "./participantsState";


export const listenIncomingParticipantConnections = (bool) =>{
    isListeningIncomingConnections.value = bool
}


export const addMember = ({ membername, socketid, peerid }) => {
  participantsListState.lastAddedMember = {
    username: membername,
    socketid: socketid,
    peerid: peerid,
  };

  participantsListState.value = [
    ...participantsListState.value,
    {
      username: membername,
      socketid: socketid,
      peerid: peerid
    },
  ];
};

export const removeMember = ({ membersocketid }) => {
 
  participantsListState.value =
    participantsListState.value.filter((member) => {
      if(member.socketId == membersocketid) {
         participantsListState.lastRemovedMember = member
      }
      return member.socketid != membersocketid;
    });
  
};