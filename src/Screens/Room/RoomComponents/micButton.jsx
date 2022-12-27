import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { APPCOLORS } from "../../../AppConstants";
import { DisbledMic } from "../../../GlobalComponents/DisabledMic";
import { EnabledMic } from "../../../GlobalComponents/EnabledMic";


export function MicButton(props) {
    const [enabled, setEnabled] = useState(false);
    const click = () => {
        setEnabled(!enabled)
    }
    return (
      <Box onClick={click} bg={APPCOLORS.panel} p={2} borderRadius={100}>
        {enabled ? (
          <EnabledMic
            color={"grey"}
            width={40}
            height={40}
            viewBox="-5 -5 40 40"
          ></EnabledMic>
        ) : (
          <DisbledMic
            color={"grey"}
            width={40}
            height={40}
            viewBox="-5 -5 40 40"
          ></DisbledMic>
        )}
      </Box>
    );
}




