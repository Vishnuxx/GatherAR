import { Stack, Box } from "@chakra-ui/react";

export function Background(props) {
    return (
      <Stack
      zIndex={-9}
        h={"100%"}
        w={"100vw"}
        bg={"black"}
        position={"absolute"}
        overflow="hidden"
        top={0}
        left={0}
        {...props}
      >
        <Circle x={"80vw"} y={"-30px"} />
        <Circle x={"0vw"} y={"40vh"} bg="#03fcca" />
        <Circle x={"70vw"} y={"80vh"} bg="#fc0388" />
      </Stack>
    );
}

function Circle({ x = "0", y = "0", bg = "#0356fc" }) {
  return (
    <Box
      w={"30vw"}
      h={"30vw"}
      position={"absolute"}
      top={y}
      left={x}
      bg={bg}
      borderRadius={"100%"}
      filter={"blur(calc(100vw/5))"}
    />
  );
}

