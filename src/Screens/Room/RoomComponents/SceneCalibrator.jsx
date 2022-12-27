import {useRecoilState} from 'recoil'
import { showCalibrator } from '../State';
import {
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
} from "@chakra-ui/react";
import { APPCOLORS } from '../../../AppConstants';


export function ScreenCalibrator() {
    const [visible , setVisible] = useRecoilState(showCalibrator);

    const handleCalibrator = (e) => {
        setVisible(false)
    }

 

     const setCalibrator = () => {
       setVisible(!visible);
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
        <Modal closeOnOverlayClick={false} isOpen={visible}>
          <ModalOverlay css={{touchAction:'none'}} />
          <ModalContent
            color="white"
            bg="none"
            boxShadow={"none"}
            justifyContent={"center"}
            alignItems={"center"}
            m={0}
            h={"100%"}
          >
            <Text>Position the content in an appropriate place</Text>
            <Button onClick={handleCalibrator} bg={APPCOLORS.primaryButton}>
              Calibrate
            </Button>
          </ModalContent>
        </Modal>
      </>
    );
        
    
}