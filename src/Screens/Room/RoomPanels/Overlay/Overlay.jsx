import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  Button,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { ScreenCalibrator } from "../../RoomComponents/SceneCalibratorButton";
import { overlayState, OVERLAY_TYPE } from "../../State";
import { CalibratorWindow } from "./OverlayContents/CalibratorWindow";

export function Overlay() {
  const [overlay, setOverlay] = useRecoilState(overlayState);

  const overlayScreens = () => {
    switch (overlay.type) {
      case OVERLAY_TYPE.CALIBRATION:
        return <CalibratorWindow />;

      default:
        return null;
    }
  };
  return (
    <Modal
      closeOnOverlayClick={overlay.closeOnOverlayClick}
      isOpen={overlay.visible}
    >
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
        {overlayScreens()}
      </ModalContent>
    </Modal>
  );
}
