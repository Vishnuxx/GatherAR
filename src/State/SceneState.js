import { proxy } from "valtio"

export const TRANSFORM_MODE ={
    TRANSLATE: 0,
    SCALE: 1,
    ROTATE: 2
}


export const transformModeState = proxy({
  value: TRANSFORM_MODE.TRANSLATE,
  isVisible: true,
  currentObjectUid: "",
});

export const isDeletable = proxy({
  value: false,
  uuid: null
})