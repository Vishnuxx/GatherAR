import { Box, Button, Center, Toast, useToast, Wrap } from "@chakra-ui/react";
import { useEffect, useMemo, useRef } from "react";
import { useSnapshot } from "valtio";
import { APPCOLORS } from "../AppConstants";
import { toastContent } from "../State/appState";

export function Toaster() {
  const toast = useToast();
  const toastcontent = useSnapshot(toastContent);
  const firstrender = useRef(false);




  useEffect(() => {
    if(firstrender.current) {
        toast({
          position: "center-bottom",
          duration: 1500,
          render: () => (
            <Center
              color="white"
              justifyContent={"center"}
              p={2}
              bg={APPCOLORS.toasrbg}
              borderRadius={100}
              fontSize={"sm"}
            >
              {toastcontent.text}
            </Center>
          ),
        });
    }
    
    firstrender.current = true

    return ()=> firstrender.current = false
  }, [toastcontent]);

  return <></>;
}
