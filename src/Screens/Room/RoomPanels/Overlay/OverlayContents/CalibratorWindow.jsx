import {Text  ,Button} from "@chakra-ui/react"
import {useRecoilState} from 'recoil'
import { APPCOLORS } from "../../../../../AppConstants";
import { isCalibratingState, overlayState } from "../../../State";

export function CalibratorWindow() {
    const [state, setstate] = useRecoilState(overlayState);
    const [isCalibrating, setIsCalibrating] =
      useRecoilState(isCalibratingState);

    const closeCalibrator = () => {
        setstate({
            visible: false,
            type: undefined
        })
        setIsCalibrating(false)
    }

    return (
      <>
        <Text>Position the content in an appropriate place</Text>
        <Button onClick={closeCalibrator} bg={APPCOLORS.primaryButton}>
          Calibrate
        </Button>
      </>
    ); 
}