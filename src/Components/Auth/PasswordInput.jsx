import { useState } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { APPCOLORS } from "../../AppConstants";

export function PasswordInput(props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input pr="4.5rem" type={show ? "text" : "password"} {...props} />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={handleClick}
          bg={APPCOLORS.card}
          css={{
            ":hover": {
              background: APPCOLORS.card,
            },
          }}
        >
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
