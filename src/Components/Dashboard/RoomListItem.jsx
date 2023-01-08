import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { APPCOLORS } from "../../AppConstants";
import img from '../../assets/images/bgIllustration.png'
import { createJoiningLink } from "../../Utilities/userMedia";

export function RoomListItem({title ,  roomid}) {
  const navigate = useNavigate()

  const join = () =>
    navigate({
      pathname: "/join",
      search: `?id=${roomid}`,
    });

    return (
      <Stack
        color={APPCOLORS.text}
        bg={"rgba(10,10,10,0.5)"}
        p={5}
        borderRadius={10}
      >
        <Image src={img}></Image>

        <Flex direction={'row'} justifyContent={"space-between"}>
          <Text w={'100%'} noOfLines={1} textOverflow={'ellipsis'} fontSize={"1.2rem"}>
            {title}
          </Text>
          <Button
            w={40}
            onClick={join}
            colorScheme={"blackAlpha"}
            bg={""}
            border={`2px solid ${APPCOLORS.primaryButton} `}
          >
            Join
          </Button>
        </Flex>
      </Stack>
    );
}