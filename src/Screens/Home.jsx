import { Stack, Heading, Flex, Button } from "@chakra-ui/react";
import { Background } from "../GlobalComponents/Background";
import { Link } from "react-router-dom";

import { APPGRADIENTS, APPROUTES, APPSTYLES } from "../AppConstants";
import { useEffect, useState } from "react";
import { checkLoginStatus, logOut } from "../Utilities/Auth";

export function Home({ props }) {
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    checkLoginStatus(
      (uid) => {
        setLoginStatus(true);
        console.log("loggedIn");
      },
      () => {
        setLoginStatus(false);
        console.log("not loggedIn");
      }
    );
    
  }, []);

  const AuthButtons = () => {
    return loginStatus ? (
      <Button
        onClick={logOut}
        {...APPSTYLES.joinCreateButton}
        bg={APPGRADIENTS.joinButton}
        colorScheme={"blackAlpha"}
      >
        Logout
      </Button>
    ) : (
      <Flex>
        <Link to={APPROUTES.login}>
          <Button
            {...APPSTYLES.joinCreateButton}
            bg={APPGRADIENTS.joinButton}
            colorScheme={"blackAlpha"}
          >
            Login
          </Button>
        </Link>

        <Link to={APPROUTES.signUp}>
          <Button
            {...APPSTYLES.joinCreateButton}
            bg={APPGRADIENTS.joinButton}
            colorScheme={"blackAlpha"}
          >
            Signup
          </Button>
        </Link>
      </Flex>
    );
  };

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

        <AuthButtons></AuthButtons>
      </Stack>
    </Stack>
  );
}
