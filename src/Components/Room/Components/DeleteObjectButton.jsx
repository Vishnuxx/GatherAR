import { Box } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { APPCOLORS } from "../../../AppConstants";
import { isDeletable } from "../../../State/SceneState";
import { socket_removeObject } from "../SceneComponents/Commands/SocketCommands";

export function DeleteObjectButton({props}) {
    const deletable = useSnapshot(isDeletable)
    const click = () =>{
        socket_removeObject(deletable.uuid)
    }
    return (
      deletable.value && (
        <Box
          w={"fit-content"}
          onClick={click}
          bg={APPCOLORS.panel}
          p={2}
          borderRadius={100}
          width={"fit-content"}
          position={'relative'}
          transform={'translateX(20px) translateY(-25px)'}
          translateX={20}
        //   position={"absolute"}
        >
          <svg
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 100-2zM10 5a1 1 0 011-1h2a1 1 0 011 1v1h-4V5zm7 14a1 1 0 01-1 1H8a1 1 0 01-1-1V8h10v11z"
              fill="#fff"
            />
          </svg>
        </Box>
      )
    );
}