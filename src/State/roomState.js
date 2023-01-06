import { proxy } from "valtio";

export const isCalibratingState = proxy({
  value: true,
});

export const peerConnection = proxy({
  isInitialized: false,
  peerid: null,
});

export const socketConnection = proxy({
  value: false,
  socketId: null,
});

export const userType = proxy({
  value: null,
});

export const joiningLinkState = proxy({
  value: "",
});

export const micState = proxy({
  isEnabled: false,
});

export const roomAdminState = proxy({
  value: "",
});

export const currentCameraPosition = proxy({
  value: []
})

export const isAdmin  = proxy({
  value: false
})
