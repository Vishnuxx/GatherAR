import { Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { APPCOLORS, APPGRADIENTS, APPROUTES } from "../../AppConstants";

export function JoinAndCreateButtons(props) {
  const navigate = useNavigate();
  const create = () => {
    navigate(APPROUTES.create);
  };

  const join = () => {
    navigate(APPROUTES.join);
  };
  return (
    <Stack {...props}>
      <Button
        onClick={join}
        colorScheme={"blackAlpha"}
        p={5}
        borderRadius={100}
        bg={""}
        outline={`3px solid white`}
      >
        Join
      </Button>
      <Button
        onClick={create}
        colorScheme={"blackAlpha"}
        p={5}
        borderRadius={100}
        bg={APPGRADIENTS.primarybutton}
      >
        Create
      </Button>
    </Stack>
  );
}
