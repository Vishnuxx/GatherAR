import { Stack, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { Background } from "../../GlobalComponents/Background";
import { useNavigate, Link } from "react-router-dom";

import style from "../../styles/home.module.css";
import { APPGRADIENTS, APPSTYLES } from "../../AppConstants";

export function Home({ props }) {
  return (
    <Stack color={"white"} overflow="hidden" h={"100vh"}>
      <Background></Background>

      <Stack justifyContent={"center"} alignItems={"center"} direction={"horizontal"}>
        <Heading fontSize={"2xl"}>GatherAR</Heading>
       
        <Flex>
          <Button
            {...APPSTYLES.joinCreateButton}
            bg={APPGRADIENTS.joinButton}
            colorScheme={"blackAlpha"}
          >
            Create
          </Button>

          <Button
            {...APPSTYLES.joinCreateButton}
            bg={APPGRADIENTS.joinButton}
            colorScheme={"blackAlpha"}
          >
            Join Room
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
}
