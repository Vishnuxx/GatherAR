import { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { APPCOLORS } from "../../AppConstants";

export function EmailInput(props) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    props.onChange(e);
    setInput(e.target.value);
  };

  const isError = input === "";

  return (
    <FormControl isInvalid={isError}>
      <Input type="email" value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          {/* Enter the email you'd like to receive the newsletter on. */}
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
    </FormControl>
  );
}

function PasswordInput(props) {
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
