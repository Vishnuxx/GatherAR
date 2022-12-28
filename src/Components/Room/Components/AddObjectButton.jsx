import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Image,
  Input,
  Skeleton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { APPCOLORS } from "../../../AppConstants";


export function AddObjectButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box onClick={onOpen} bg={APPCOLORS.panel} p={2} borderRadius={100}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 3.33331C16.7037 3.33331 13.4814 4.3108 10.7405 6.14215C7.99972 7.97351 5.86352 10.5765 4.60206 13.6219C3.3406 16.6674 3.01054 20.0185 3.65363 23.2515C4.29671 26.4845 5.88406 29.4542 8.21494 31.7851C10.5458 34.116 13.5155 35.7033 16.7485 36.3464C19.9816 36.9895 23.3327 36.6594 26.3781 35.398C29.4235 34.1365 32.0265 32.0003 33.8579 29.2595C35.6892 26.5187 36.6667 23.2963 36.6667 20C36.6667 17.8113 36.2356 15.644 35.398 13.6219C34.5605 11.5998 33.3328 9.76251 31.7852 8.21487C30.2375 6.66722 28.4002 5.43957 26.3781 4.60199C24.356 3.76441 22.1887 3.33331 20 3.33331ZM20 33.3333C17.363 33.3333 14.7851 32.5513 12.5924 31.0862C10.3998 29.6212 8.69082 27.5388 7.68165 25.1024C6.67249 22.6661 6.40844 19.9852 6.92291 17.3988C7.43738 14.8124 8.70726 12.4366 10.572 10.5719C12.4367 8.70719 14.8124 7.43731 17.3988 6.92284C19.9853 6.40837 22.6661 6.67242 25.1025 7.68159C27.5388 8.69075 29.6212 10.3997 31.0863 12.5924C32.5514 14.785 33.3334 17.3629 33.3334 20C33.3334 23.5362 31.9286 26.9276 29.4281 29.4281C26.9277 31.9286 23.5363 33.3333 20 33.3333ZM26.6667 18.3333H21.6667V13.3333C21.6667 12.8913 21.4911 12.4674 21.1786 12.1548C20.866 11.8422 20.4421 11.6666 20 11.6666C19.558 11.6666 19.1341 11.8422 18.8215 12.1548C18.509 12.4674 18.3334 12.8913 18.3334 13.3333V18.3333H13.3334C12.8914 18.3333 12.4674 18.5089 12.1549 18.8215C11.8423 19.134 11.6667 19.558 11.6667 20C11.6667 20.442 11.8423 20.8659 12.1549 21.1785C12.4674 21.4911 12.8914 21.6666 13.3334 21.6666H18.3334V26.6666C18.3334 27.1087 18.509 27.5326 18.8215 27.8452C19.1341 28.1577 19.558 28.3333 20 28.3333C20.4421 28.3333 20.866 28.1577 21.1786 27.8452C21.4911 27.5326 21.6667 27.1087 21.6667 26.6666V21.6666H26.6667C27.1087 21.6666 27.5327 21.4911 27.8452 21.1785C28.1578 20.8659 28.3334 20.442 28.3334 20C28.3334 19.558 28.1578 19.134 27.8452 18.8215C27.5327 18.5089 27.1087 18.3333 26.6667 18.3333Z"
            fill="#fff"
          />
        </svg>
      </Box>
      <ObjectsDrawer isOpen={isOpen} onClose={onClose}></ObjectsDrawer>
    </>
  );
}

function ObjectsDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      size={"xs"}
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      bg={"#262626"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader bg={"#262626"} color={"white"}>
          3D Models
        </DrawerHeader>
        <SearchBar></SearchBar>
        <DrawerBody bg={"#262626"} p={3}>
          <LoadingSkeleton></LoadingSkeleton>
        </DrawerBody>
        <SelectButton isEnabled={true}></SelectButton>
      </DrawerContent>
    </Drawer>
  );
}

function SearchBar(props) {
  return (
    <Flex bg={APPCOLORS.secondaryBg} p={2} color={APPCOLORS.text}>
      <Input placeholder="Search 3d models here..."></Input>
    </Flex>
  );
}

function SelectButton({ isEnabled }) {
  return (
    <Button
      bg={isEnabled ? APPCOLORS.primaryButton : APPCOLORS.disabledButton}
      color={isEnabled ? APPCOLORS.text : APPCOLORS.disabledButtonText}
    >Select</Button>
  );
}


function LoadingSkeleton(props) {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
      <Skeleton width={"100%"} h={"100px"} />
      <Skeleton width={"100%"} h={"100px"} />
      <Skeleton width={"100%"} h={"100px"} />
      <Skeleton width={"100%"} h={"100px"} />
      <Skeleton width={"100%"} h={"100px"} />
      <Skeleton width={"100%"} h={"100px"} />
      <Skeleton width={"100%"} h={"100px"} />
      <Skeleton width={"100%"} h={"100px"} />
    </Grid>
  );
}