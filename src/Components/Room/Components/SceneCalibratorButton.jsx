import { useRecoilState } from "recoil";

import {
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
} from "@chakra-ui/react";
import { APPCOLORS } from "../../../AppConstants";
import {
  isCalibratingState,
  overlayState,
  OVERLAY_TYPE,
} from "../../../State/State";

//button which opens calibration overlay

export function ScreenCalibratorButton() {
  const [visible, setVisible] = useRecoilState(overlayState);
  const [isCalibrating, setIsCalibrating] = useRecoilState(isCalibratingState);

  const setCalibrator = () => {
    setVisible({
      visible: true,
      type: OVERLAY_TYPE.CALIBRATION,
      closeOnOverlayClick: false,
    });

    setIsCalibrating(true);
  };

  return (
    <>
      <Button
        bg={APPCOLORS.panel}
        p={2}
        borderRadius={100}
        onClick={setCalibrator}
      >
        Click
      </Button>
    </>
  );
}