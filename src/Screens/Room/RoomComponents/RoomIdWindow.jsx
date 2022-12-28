import {
  Stack,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import {useRecoilValue} from 'recoil'

import { APPCOLORS } from "../../../AppConstants";
import { isHost } from "../State";


export function RoomIdPane({props}) {
    
    const isAHost = useRecoilValue(isHost)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [roomId, setroomId] = useState(null);

    const open = () => {
        onOpen();
        //check where you are the host
        if(isAHost.state === true) {
            
        } else {    
            
        }
    }
    return (
      <>
        <Button onClick={open} bg={APPCOLORS.panel} p={2} borderRadius={100}>
          <svg
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path
              d="M12.3 12.22A4.92 4.92 0 0014 8.5a5 5 0 00-10 0 4.92 4.92 0 001.7 3.72A8 8 0 001 19.5a1 1 0 102 0 6 6 0 1112 0 1 1 0 002 0 8 8 0 00-4.7-7.28zM9 11.5a3 3 0 110-6 3 3 0 010 6zm9.74.32A5 5 0 0015 3.5a1 1 0 100 2 3 3 0 013 3 3 3 0 01-1.5 2.59 1 1 0 00-.05 1.7l.39.26.13.07a7 7 0 014 6.38 1 1 0 002 0 9 9 0 00-4.23-7.68z"
              fill="#fff"
            />
          </svg>
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent color={"white"} bg={"rgba(0,0,0,0.5)"}>
            <Stack
            gap={'15px'}
              direction={"horizontal"}
              h={"100px"}
              justifyContent="center"
              alignItems={"center"}
              p={"3"}
            >
              <Text w={"100%"} bg={"rgba(100,100,100,0.5)"} h={"30px"} borderRadius={"5px"}>
                {roomId}
              </Text>
              <Button size={"sm"} color={APPCOLORS.urlAnchor} colorScheme="none" mr={3} onClick={onClose}>
                Copy ID
              </Button>
            </Stack>
          </ModalContent>
        </Modal>
      </>
    );
   
}
