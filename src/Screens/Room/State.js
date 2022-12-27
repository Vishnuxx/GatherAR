import { atom } from "recoil";

export const OVERLAY_TYPE = {
  CALIBRATION: 1,
};



export const overlayState = atom({
  key: "overlay",
  default: {
    visible: true,
    type: OVERLAY_TYPE.CALIBRATION,
    closeOnOverlayClick: false
  },
});

export const isCalibratingState = atom({
  key: "isCalibrating",
  default: true,
});

export const isHost = atom({
  key: "isHost",
  default: false,
});
