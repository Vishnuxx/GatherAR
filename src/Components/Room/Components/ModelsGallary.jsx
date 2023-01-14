import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Flex,
  Stack,
  Box,
  Image,
  Text,
  Card,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { APPGRADIENTS } from "../../../AppConstants";

export function ModelGallary() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Open Models
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"rgba(10,10,10,0.6)"}>
          <DrawerCloseButton />
          <DrawerHeader color={"white"}>Available Models</DrawerHeader>

          <DrawerBody p={0}>
            <Stack overflowY={"scroll"} h={"300px"}>
              {/* <Shimmer></Shimmer> */}
              <Stack>
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
              </Stack>
            </Stack>
            <Stack m={3} direction={"row"} gap={3}>
              <Input placeholder="Type here..." />
              <Button
                color={"white"}
                bg={APPGRADIENTS.primarybutton}
                colorScheme="gray"
              >
                Search
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}


function Shimmer() {
    return (
      <Stack>
        <Skeleton height="250px" />
        <Skeleton height="250px" />
        <Skeleton height="250px" />
      </Stack>
    );
}

function ListItem({image , title="title", url}) {
    const addModel = () => {

    }
    return (
      <Box border={"1px solid grey"} height={"250px"} w={"100%"}>
        <Image
          border={"1px solid grey"}
          h={"250px"}
          w={"100%"}
          src={image}
        ></Image>
        <Stack
          w={"100%"}
          h={'fit-content'}
          justifyContent={"space-between"}
        //   position={"absolute"}
          direction={"row"}
          p={4}
        >
          <Text color={"white"}>{title}</Text>
          <Button
            color={"white"}
            bg={APPGRADIENTS.primarybutton}
            onClick={addModel}
          >
            Add
          </Button>
        </Stack>
      </Box>
    );
}