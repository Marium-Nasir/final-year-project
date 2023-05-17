import {
  FormControl,
  FormLabel,
  Button,
  Input,
  VStack,
  useToast,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const toast = useToast();
  const handleClick = () => setshow(!show);
  const Navigate = useNavigate()

  const submit = async () => {
    setloading(true);
    if ( !email || !pass) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }

   
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, pass },
        config
      );
      toast({
        title: "Login successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
     if(data.role == 1){

       Navigate("/studentprofile")
      }
      else{
       Navigate("/driverprofile")
     }
      
      
    } catch (error) {
      toast({
        title: "An error occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };

  return (
    <VStack>
      <FormControl id="emailid" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email address"
          onChange={(e) => setemail(e.target.value)}
        />

        <FormControl id="pass" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setpass(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submit}
          isLoading={loading}
        >
          Login
        </Button>
      </FormControl>
      <Link  to="/otp">
        Forgot Password
      </Link>
    </VStack>
  );
}

export default LogIn;
