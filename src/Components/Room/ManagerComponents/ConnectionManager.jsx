import { useEffect } from "react";
import { createRoom, initSocket } from "../../../Utilities/socketConnection";


export function ConnectionManager() {
  useEffect(() => {
    initSocket(()=>{
        createRoom("sd")
    })
  }, []);

  return <></>;
}