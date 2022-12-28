import { Stack, Heading, Flex, Button } from "@chakra-ui/react";
import { Background } from "../GlobalComponents/Background";
import { Link } from "react-router-dom";

import { APPGRADIENTS, APPROUTES, APPSTYLES } from "../AppConstants";

export function Home({ props }) {
  return (
    <Stack color={"white"} overflow="hidden" h={"100vh"}>
      <Background></Background>

      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"horizontal"}
      >
        <Heading fontSize={"2xl"}>GatherAR</Heading>

        <Flex>
          <Link to={APPROUTES.create}>
            <Button
              {...APPSTYLES.joinCreateButton}
              bg={APPGRADIENTS.joinButton}
              colorScheme={"blackAlpha"}
            >
              Create
            </Button>
          </Link>

          <Link to={APPROUTES.join}>
            <Button
              {...APPSTYLES.joinCreateButton}
              bg={APPGRADIENTS.joinButton}
              colorScheme={"blackAlpha"}
            >
              Join Room
            </Button>
          </Link>
        </Flex>
      </Stack>
    </Stack>
  );
}
