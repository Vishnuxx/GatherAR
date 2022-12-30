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
            bg={'none'}
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
    <Stack color={"white"} overflow="hidden" h={"100%"} direction={"column"} alignItems={'center'}>
      <Background></Background>

      <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"} w={'100%'} p={3}>
        <Heading fontSize={"2xl"}>GatherAR</Heading>
        <AuthButtons></AuthButtons>
      </Stack>
      <Flex direction={'column'}>

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
  );
}
