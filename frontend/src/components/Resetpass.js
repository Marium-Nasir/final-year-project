import {
  Container,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Resetpass = () => {
    const {id,token} = useParams()
    console.log(id)
     const toast = useToast();
   const [pass,setpass]= useState('')
    const [cpass, setcpass] = useState("");
   const [loading,setloading] = useState(false)
    const [show, setshow] = useState(false);
   const handleClick = () => setshow(!show);
     
   const submit= async()=>{
     setloading(true);
    if (!pass||!cpass) {
         toast({
           title: "Please fill all the fields",
           status: "warning",
           duration: 3000,
           isClosable: true,
           position: "bottom",
         });
         setloading(false);
         return
    }
      if (pass!==  cpass) {
        toast({
          title: "Passwords donot match",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setloading(false);
        return
      }
    try {
            const config ={
                headers:{
                    "Content-type":"application/json"
                }

            }
            const { data } = await axios.post(
              "/api/user/resetyourpass/:id/:token",
              { pass,id,token },
              config
            );
                toast({
                  title: "You reset your password",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                });
                   localStorage.setItem("userInfo", JSON.stringify(data));
                   setloading(false);
                   
         } catch (error) {
             toast({
               title: "An error occured",
               description: error.response.data.message,
               status: "error",
               duration: 3000,
               isClosable: true,
               position: "bottom",
             });
             setloading(false);
         }
   }
  return (
    <Container>
      <FormControl id="respass" isRequired>
        <FormLabel>Pssword</FormLabel>
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
      <FormControl id="rescpass" isRequired>
        <FormLabel m="20px 0 10px 0" >Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password again"
            onChange={(e) => setcpass(e.target.value)}
            
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
        width="15%"
        style={{ marginTop: 20 }}
        onClick={submit}
        isLoading={loading}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Resetpass;
