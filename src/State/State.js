import { atom } from "recoil";

export const OVERLAY_TYPE = {
  NONE: 0,
  CALIBRATION: 1,
};



export const overlayState = atom({
  key: "overlay",
  default: {
    visible: false,
    type: OVERLAY_TYPE.NONE,
    closeOnOverlayClick: false
  },
});

// export const isCalibratingState = atom({
//   key: "isCalibrating",
//   default: true,
// });

export const isHost = atom({
  key: "isHost",
  default: false,
});


export const sharingLink = atom({
  key: 'sharinglink',
  default: null
})


export const isShapesPanelOpenState = atom({
  key: "isShapesPanelOpenState",
  default: false,
});