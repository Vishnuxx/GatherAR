import { proxy } from "valtio";

export const participantsListState = proxy({
  value: [],
  lastAddedMember: null,
  lastRemovedMember: null,
});

export const isListeningIncomingConnections = proxy({
  value: false
})

export const isSpekinc = proxy({
  value:false
})