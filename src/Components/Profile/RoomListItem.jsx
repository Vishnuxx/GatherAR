import { Button, Image, Stack, Text } from "@chakra-ui/react";
import { APPCOLORS } from "../../AppConstants";
import img from '../../assets/images/bgIllustration.png'

export function RoomListItem({title ,  joinUrl}) {
    return (
      <Stack color={APPCOLORS.text} bg={'rgba(10,10,10,0.5)'} p={5} borderRadius={10}>
        <Image src={img}></Image>
        <Text noOfLines={1} fontSize={'1.2rem'}>{title}</Text>
        <Button colorScheme={'blackAlpha'} bg={''} border={`1px solid ${APPCOLORS.primaryButton} `} >Join</Button>
      </Stack>
    );
}