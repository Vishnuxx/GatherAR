import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APPCOLORS, APPROUTES } from "../../AppConstants";
import { logOut } from "../../Utilities/Auth";
import { getUserData } from "../../Utilities/localDataStorage";



export function UserDrawer({username}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate()
    const btnRef = useRef();
   
    const logout = () =>{
      logOut()
      // navigate(APPROUTES.home , {
      //   replace: true
      // })
    }

    return (
      <>
        <Avatar
          bg={APPCOLORS.card}
          color={"white"}
          w={10}
          h={10}
          name={username}
          onClick={onOpen}
        />
        <Drawer
          bg={"none"}
          colorScheme={"blackAlpha"}
          isOpen={isOpen}
          placement="bottom"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg={"blackAlpha.900"}>
            <DrawerBody bg={""}>
              <Stack color={APPCOLORS.text} gap={10}>
                <Button
                  onClick={logout}
                  color="red.400"
                  fontWeight={"normal"}
                  colorScheme={"blackAlpha"}
                >
                  Log Out
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
}

