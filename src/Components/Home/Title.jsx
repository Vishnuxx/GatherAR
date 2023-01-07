import { Center, Heading, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { APPCOLORS } from "../../AppConstants";
import { BackgroundCoverImage } from "./BackgroundImage";



export function Title() {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
      <Center flexDirection={"column"} p={3}>
        <Stack alignItems={"center"} gap={6} justifyContent={"center"}>
          {/* <Heading
            fontWeight={"bold"}
            fontSize={"3rem"}
            color={APPCOLORS.gatherar}
          >
            GatherAR
          </Heading> */}
          <BackgroundCoverImage></BackgroundCoverImage>
          <Text position='relative' transform={'translateY(-50px)'}  align={'center'} fontWeight={"hairline"}>
            Gather, Tinker and Collaborate in Augmented reality
          </Text>
        </Stack>
      </Center>
    );
}