import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { APPCOLORS } from "../../../AppConstants";
import { DisbledMic } from "../../../GlobalComponents/DisabledMic";
import { EnabledMic } from "../../../GlobalComponents/EnabledMic";
import { micState } from "../../../State/roomState";
import {useSnapshot} from 'valtio'
import { enableMic } from "../../../State/roomActions";

export function MicButton(props) {
    const mic = useSnapshot(micState)
    const click = () => {
        enableMic(!mic.isEnabled)
    }
    return (
      <Box onClick={click} bg={APPCOLORS.panel} p={2} borderRadius={100}>
        {mic.isEnabled ? (
          <EnabledMic
            color={"white"}
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




