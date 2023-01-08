import { getSocket } from "../../../../Utilities/socketConnection";

export var isSharable = true;

var socket;

export const initSocketCommands = (sharable) => {
  socket = getSocket();
  isSharable = sharable;
};

//uid : objects uid , name: object name in the pallete
export const socket_addPrimitiveObject = (uid, name, position , type) => {
  socket.emit("add-object", {
    uid: uid,
    name: name,
    position: position,
    type:type
  });
};

export const socket_removeObject = (uid) => {
  socket.emit("remove-object", {
    uid: uid,
  });
};

export const socket_updateObject = (uid, property, value) => {
  socket.emit("update-object", {
    uid: uid,
    property: property,
    value: value,
  });
};

export const socket_dragObject = (uid, { matrix }) => {
  socket.emit("update-object-matrix", {
    uid: uid,
    matrix: matrix
  });
};

export const socket_updateObjectTransforms = (
  uid,
  position,
  rotation,
  scale
) => {
  socket.emit("update-object-transforms", {
    uid: uid,
    position: position,
    scale: scale,
    rotation: rotation,
  });
};
