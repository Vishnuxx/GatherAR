import { Box, Button, Center, Toast, useToast, Wrap } from "@chakra-ui/react";
import { useEffect, useMemo, useRef } from "react";
import { useSnapshot } from "valtio";
import { APPCOLORS } from "../AppConstants";
import { toastContent } from "../State/appState";

export function useToaster() {
  const toast = useToast();

  function showToast(message, duration) {
    toast({
      position: "center-bottom",
      duration: duration ? duration : 1500,
      render: () => (
        <Center
          color="white"
          justifyContent={"center"}
          p={2}
          bg={APPCOLORS.toasrbg}
          borderRadius={100}
          fontSize={"sm"}
        >
          {message}
        </Center>
      ),
    });
  }

  return showToast;
}




