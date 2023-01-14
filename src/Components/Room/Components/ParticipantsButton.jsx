import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
  Flex,
  Text,
} from "@chakra-ui/react";

import { APPCOLORS } from "../../../AppConstants";

import { useRecoilValue } from "recoil";
import { useSnapshot } from "valtio";
import { roomDetails } from "../../../State/roomState";
import { participantsListState } from "../../../State/participantsState";

export function ParticipantsButton({ props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box onClick={onOpen} bg={APPCOLORS.panel} p={2} borderRadius={100}>
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
      <ParticipantsDrawer
        isOpen={isOpen}
        onClose={onClose}
      ></ParticipantsDrawer>
    </Box>
  );
}

function ParticipantsDrawer({ isOpen, onClose }) {
  return (
    <Drawer size={"xs"} isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader bg={"#262626"} color={"white"}>
          Participants
        </DrawerHeader>

        <DrawerBody p={0}>
          <ParticipantsList />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function ParticipantsList(props) {
  const members = useSnapshot(participantsListState);

  const admin = useSnapshot(roomDetails);
  // console.log(members.value);
  return (
    <Stack w={"100%"} h={"100%"} bg={"#262626"} direction="column">
      {members.value.map((member, i) => {
        const { username, peerid, socketid } = member;
        return (
          <Flex key={i} color={APPCOLORS.text} w={"100%"}>
            <Text maxW={200} w={"100%"} color={"white"} padding={3}>
              {username}
            </Text>
          </Flex>
        );
      })}
    </Stack>
  );
}
