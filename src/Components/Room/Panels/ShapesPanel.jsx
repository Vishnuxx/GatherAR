
import { Flex, Stack, Image, Text, Button } from "@chakra-ui/react";

export function ShapesPanel(props) {
    const data = [
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "box",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "cylinder",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "sphere",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "torus",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "torus",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "torus",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "torus",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "torus",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "torus",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "torus",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "torus",
      },
      {
        icon: "https://img.icons8.com/color/48/null/object.png",
        label: "torus",
      },
    ];
    return (
      <Flex
        overflow={"scroll"}
        css={{
          scrollbarWidth: "0px",
        }}
        color={"white"}
        direction={"row"}
        {...props}
        w={"100%"}
        p={3}
        bg={"rgb(10, 10 , 10 , 0.3)"}
        borderRadius={"20px"}
      >
        <Stack
          css={{
            scrollbarWidth: "0",
          }}
          direction={"row"}
          w={"100"}
        >
          {data.map((data, index) => {
            return (
              <Item key={index} icon={data.icon} label={data.label}></Item>
            );
          })}
        </Stack>
      </Flex>
    );
}


function Item({icon , label}) {
    return (
      <Button bg={"none"} width={"100px"} height={"50px"}>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems={"center"}
          width={"100px"}
          height={"50px"}
        >
          <Image width={"30px"} height={"30px"} src={icon}></Image>
          <Text size={"sm"} fontSize={"1rem"}>
            {label}
          </Text>
        </Flex>
      </Button>
    );
}