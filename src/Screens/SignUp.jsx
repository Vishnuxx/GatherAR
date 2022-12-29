import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import validator from "validator";
import { APPCOLORS, APPROUTES } from "../AppConstants";
import { Background } from "../GlobalComponents/Background";
import { signUp } from "../Utilities/Auth";
import { useNavigate } from "react-router-dom";

export function SignUp() {

  const [errorMessage, seterrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");


  
const navigate = useNavigate();
      
  const updateUserName = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
  };

  const validatePasswordLength = () => {
    return password.length > 6 && confirmPassword > 6;
  };

  const validatePasswordMatch = () => {
    return password === confirmPassword;
  };

  const submit = () => {
    
    if (!validator.isEmail(email)) {
      seterrorMessage("Invalid Email");

      return;
    }

    if (validatePasswordLength() !== true) {
      seterrorMessage("Password length should be more than 6 ");
      return;
    }

    if (validatePasswordMatch() !== true) {
      seterrorMessage("Password doesn't match");
      return;
    }

    seterrorMessage("");

    signUp(username ,email ,  password , confirmPassword ,(user)=>{
      //success
      console.log(user.uid)
      navigate(APPROUTES.home)
    } , (err)=>{
      seterrorMessage(err.toString());
    })
  };

  return (
    <Stack
      color={"white"}
      height={"100vh"}
      width={"100vw"}
      dir="vertical"
      align={"center"}
      justify="center"
      p="5"
      overflowY={"scroll"}
    >
      <Background></Background>
      <Stack dir="vertical" gap={2} w={"300px"} height={"fit-content"}>
        <Text fontSize={"2rem"}>SignUp</Text>
        <FormLabel>UserName</FormLabel>
        <Input
          type={"text"}
          placeholder="Enter your UserName"
          onChange={updateUserName}
        />

        <EmailInput onChange={updateEmail}></EmailInput>
        {/* <FormLabel>Email</FormLabel>
        <Input type={'email'} placeholder="Enter your Email" onChange={updateEmail} /> */}

        <FormLabel>Password</FormLabel>
        <PasswordInput
          placeholder="Enter your Password"
          onChange={updatePassword}
        />

        <FormLabel>ConfirmPassword</FormLabel>
        <PasswordInput
          placeholder="Confirm Password"
          onChange={updateConfirmPassword}
        />

        {/* <RadioGroup dir="horizontal" w={"100%"}>
          <FormLabel>Avatar</FormLabel>
          <Flex justifyContent={"space-around"}>
            <Radio value={"male"} defaultChecked={true}>
              Male
            </Radio>
            <Radio value={"female"}>Female</Radio>
          </Flex>
        </RadioGroup> */}
        <Text color={"red"} size={"sm"}>
          {errorMessage}
        </Text>
        <Button
          size={"md"}
          variant="solid"
          bg={APPCOLORS.primaryButton}
          onClick={submit}
        >
          SignUP
        </Button>
        <Link to={APPROUTES.login} replace={true} color={APPCOLORS.urlAnchor}>
          Have an Account? Login
        </Link>
      </Stack>
    </Stack>
  );
}

function EmailInput(props) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    props.onChange(e);
    setInput(e.target.value);
  };

  const isError = input === "";

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>Email</FormLabel>
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
