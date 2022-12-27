import { Stack } from "@chakra-ui/react";
import { APPCOLORS } from "../../../AppConstants";



export function ObjectOptionsPanel(props) {
  return (
    <Stack
      width={"100%"}
      height={"30px"}
      bg={APPCOLORS.panel}
      opacity={"0.8"}
      color={APPCOLORS.text}
      borderRadius={"20px"}
      p={1}
    >
       {props.children}
    </Stack>
  );
}
