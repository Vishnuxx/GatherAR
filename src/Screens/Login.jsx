import {
  Button,
  Center,
  FormLabel,
  Input,
  Stack,
  TagLabel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { APPCOLORS, APPROUTES } from "../AppConstants";
import { Background } from "../GlobalComponents/Background";
import validator from "validator";
import { login } from "../Utilities/Auth";
import { useNavigate } from "react-router-dom";
import { EmailInput } from "../Components/Auth/EmailInput";
import { PasswordInput } from "../Components/Auth/PasswordInput";

export function Login() {
  const navigate = useNavigate();
  const signupScreenUrl = "/signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const validatePasswordLength = () => {
    console.log(password.length);
    return password.length > 6;
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

    seterrorMessage("");

    login(
      email,
      password,
      (user) => {
        console.log("login successful");
        navigate(APPROUTES.home, {
          replace: true,
        });
      },
      (error) => {
        seterrorMessage(error.message.toString());
      }
    );
  };

  return (
    <Stack
      color={"white"}
     
      height={"90vh"}
      width={"100vw"}
      dir="column"
      align={"center"}
      justify="center"
      p="5"
      overflowY={"scroll"}
    >
      <Background></Background>
      <Stack dir="vertical" gap={2} w={"300px"} justify={'center'} height={"100%"}>
        <Text fontSize={"2rem"}>Login</Text>
        <FormLabel>Email</FormLabel>
        <EmailInput onChange={updateEmail} placeholder="Enter your Email" />
        <FormLabel>Password</FormLabel>
        <PasswordInput
          onChange={updatePassword}
          placeholder="Enter your Password"
        />
        <Text color={"red"} size={"sm"}>
          {errorMessage}
        </Text>
        <Button
          onClick={submit}
          size={"md"}
          variant="solid"
          backgroundColor={APPCOLORS.primaryButton}
        >
          Submit
        </Button>
        <Link to={signupScreenUrl} replace={true} color={APPCOLORS.urlAnchor}>
          <Text color={APPCOLORS.urlAnchor}>Don't have an Account? SignUp</Text>
        </Link>
      </Stack>
    </Stack>
  );
}
