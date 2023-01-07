import {
  Stack,
  Heading,
  Flex,
  Button,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import { Background } from "../GlobalComponents/Background";
import { Link, useNavigate } from "react-router-dom";

import { APPCOLORS, APPGRADIENTS, APPROUTES, APPSTYLES } from "../AppConstants";
import { useEffect, useState } from "react";
import { checkLoginStatus, isAuthenticated, logOut } from "../Utilities/Auth";
import { fetchAndSaveUserData, getUserDetails } from "../Utilities/db";
import { getPrimitiveObject } from "../Components/Room/SceneComponents/SceneUtils/primitiveObjects";

import { Title } from "../Components/Home/Title";
import { UserDrawer } from "../Components/Profile/UserDrawer";
import { BackgroundCoverImage } from "../Components/Home/BackgroundImage";
import { getAuth } from "firebase/auth";
import { authState } from "../State/appState";
import { useSnapshot } from "valtio";

export function Home({ props }) {

  const navigate = useNavigate();
  const isAuthenticated = useSnapshot(authState)

  //listen for authentication change
  useEffect(() => {
    getAuth().onAuthStateChanged(function (user) {
      if (user) {
        authState.value = true
      } else {
        authState.value = false
      }
    });
  }, []);




  const gotodashboard = () => {
    navigate(APPROUTES.dashboard);
  };

  const AuthButtons = () => {
    return (
      <Flex>
        <Link to={APPROUTES.signUp}>
          <Button
            {...APPSTYLES.joinCreateButton}
            bg={""}
            colorScheme={"blackAlpha"}
          >
            Signup
          </Button>
        </Link>
        <Link to={APPROUTES.login}>
          <Button
            {...APPSTYLES.joinCreateButton}
            bg={APPGRADIENTS.primarybutton}
            colorScheme={"blackAlpha"}
          >
            Login
          </Button>
        </Link>
      </Flex>
    );
  };

  return (
    <Stack
      color={"white"}
      overflow="hidden"
      h={"90vh"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Background></Background>

      <Title></Title>

      <Stack
        justifyContent={"flex-end"}
        alignItems={"center"}
        direction={"column"}
        w={"100%"}
        p={3}
      >
        {isAuthenticated.value ? (
          <Button bg={APPGRADIENTS.primarybutton} onClick={gotodashboard}>
            Go To Dashboard
          </Button>
        ) : (
          <AuthButtons></AuthButtons>
        )}
      </Stack>
    </Stack>
  );
}
