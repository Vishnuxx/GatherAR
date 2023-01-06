import uuid from "react-uuid";
import { proxy } from "valtio"

export const signal_currentPrimitiveObject = proxy({
    change: true,
    name : "",
    uid:''
})

export const signal_addPrimitiveObject = (name) => {
    signal_currentPrimitiveObject.name = name;
    signal_addPrimitiveObject.uid = uuid()
    signal_currentPrimitiveObject.change =
      !signal_currentPrimitiveObject.change;
}