import { Text, Button, Stack } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useSnapshot } from "valtio";
import { APPCOLORS, APPGRADIENTS } from "../../../../AppConstants";
import { isCalibratingState } from "../../../../State/roomState";
import { overlayState } from "../../../../State/State";

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
    <Stack gap={10}>
      <Text opacity={0.8}>Position the content in an appropriate place</Text>
      <Button onClick={closeCalibrator} bg={APPGRADIENTS.primarybutton} borderRadius={10} fontWeight={"bold"}>
        Calibrate
      </Button>
    </Stack>
  );
}
