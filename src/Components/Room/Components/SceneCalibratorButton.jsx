import { useRecoilState } from "recoil";

import {
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
} from "@chakra-ui/react";
import { APPCOLORS, APPGRADIENTS } from "../../../AppConstants";
import {

  overlayState,
  OVERLAY_TYPE,
} from "../../../State/State";
import { useSnapshot } from "valtio";
import { isCalibratingState } from "../../../State/roomState";

//button which opens calibration overlay

export function ScreenCalibratorButton() {
  const [visible, setVisible] = useRecoilState(overlayState);
  const isCalibrating = useSnapshot(isCalibratingState);

  const setCalibrator = () => {
    setVisible({
      visible: true,
      type: OVERLAY_TYPE.CALIBRATION,
      closeOnOverlayClick: false,
    });

    isCalibratingState.value = true
  };

  return (
    <>
      <Button
        bg={APPGRADIENTS.primarybutton}
        colorScheme={'blackAlpha'}
        p={2}
        w={100}
        borderRadius={10}
        onClick={setCalibrator}
      >
        Calibrate
      </Button>
    </>
  );
}
