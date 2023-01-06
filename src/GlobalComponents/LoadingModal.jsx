import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  Button,

} from "@chakra-ui/react";

import { Dna } from "react-loader-spinner";

import {useSnapshot} from 'valtio'
import { loadingOverlay } from "../State/appState";

export function LoadingModal({isOpen}) {
  const loading = useSnapshot(loadingOverlay)
  return (
    <Modal closeOnOverlayClick={false} isOpen={loading.visible}>
      <ModalOverlay css={{ touchAction: "none" }} />
      <ModalContent
        color="white"
        bg="none"
        boxShadow={"none"}
        justifyContent={"center"}
        alignItems={"center"}
        m={0}
        h={"100%"}
      >
        <Dna
          visible={true}
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        <h4>Loading...</h4>
      </ModalContent>
    </Modal>
  );
}
