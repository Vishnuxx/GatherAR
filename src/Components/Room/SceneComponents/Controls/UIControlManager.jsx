
import { useEffect } from "react";
import { useThree } from "react-three-fiber";
import uuid from "react-uuid";
import { useSnapshot } from "valtio";
import { currentCameraPosition } from "../../../../State/roomState";
import { signal_currentPrimitiveObject } from "../../../../State/SceneUiControlActions";
import {  socket_addPrimitiveObject } from "../Commands/SocketCommands";


//listens the ui control elements and sends the commands to the socket
export function UIControlManager({socket  }) {
    const currentPrimObj = useSnapshot(signal_currentPrimitiveObject)
    const cameraPosition = useSnapshot(currentCameraPosition)
    //listens ui compoents commands
    useEffect(() => {
 
        socket_addPrimitiveObject(uuid() , signal_currentPrimitiveObject.name , cameraPosition.value)
    }, [currentPrimObj]);
    return <></>
}