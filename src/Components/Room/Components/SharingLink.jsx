import {
  Stack,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import { APPCOLORS } from "../../../AppConstants";
import { sharingLink } from "../../../State/State";

import { useSnapshot } from "valtio";
import { joiningLinkState, roomDetails } from "../../../State/roomState";
import { CopyIcon } from "../Icons/copytoclipboard";

export function SharingLink({ props }) {
  const sharingLinkSnap = useSnapshot(joiningLinkState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("copy");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharingLinkSnap.value);
    setText("copied");
    // onClose()
  };

 

  const open = () => {
    onOpen();
  };

  return (
    <>
      <Button onClick={open} bg={APPCOLORS.panel} p={2} borderRadius={100}>
        <CopyIcon></CopyIcon>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"white"} bg={"rgba(0,0,0,0.5)"}>
          <Stack
            gap={"15px"}
            direction={"horizontal"}
            h={"100px"}
            justifyContent="center"
            alignItems={"center"}
            p={"3"}
          >
            <Text
              w={"100%"}
              bg={"rgba(100,100,100,0.5)"}
              h={"30px"}
              borderRadius={"5px"}
              color="white"
              overflow={"scroll"}
              noOfLines={1}
            >
              {sharingLinkSnap.value}
            </Text>
            <Button
              size={"sm"}
              color={APPCOLORS.urlAnchor}
              colorScheme="none"
              mr={3}
              onClick={copyToClipboard}
            >
              {text}
            </Button>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
}
