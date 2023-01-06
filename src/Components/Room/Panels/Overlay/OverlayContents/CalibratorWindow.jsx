import { Text, Button } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useSnapshot } from "valtio";
import { APPCOLORS } from "../../../../../AppConstants";
import { isCalibratingState } from "../../../../../State/roomState";
import { overlayState } from "../../../../../State/State";

export function CalibratorWindow() {
  const [state, setstate] = useRecoilState(overlayState);


  const closeCalibrator = () => {
    setstate({
      visible: false,
      type: undefined,
    });
    isCalibratingState.value = false;
  };

  return (
    <>
      <Text opacity={0.8}>Position the content in an appropriate place</Text>
      <Button onClick={closeCalibrator} bg={APPCOLORS.primaryButton} borderRadius={"100%"} fontWeight={"bold"}>
        Calibrate
      </Button>
    </>
  );
}
