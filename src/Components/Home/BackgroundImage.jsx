import { Box, Image } from "@chakra-ui/react";
import img from "../../assets/images/bgIllustration.png";

export function BackgroundCoverImage() {
  return (
    <Box>
      <Image m={0} p={0} src={img}></Image>
    </Box>
  );
}
