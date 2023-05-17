import {
  Container,
  FormControl,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from 'react'
import axios from "axios";

const Forgotpass = () => {
     const toast = useToast();
   const [email,setemail]= useState('')
   const [loading,setloading] = useState(false)
   const submit= async()=>{
     setloading(true);
    if (!email) {
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
    try {
            const config ={
                headers:{
                    "Content-type":"application/json"
                }

            }
            const {data} = await axios.post("/api/user/forgotpass",{email},config)
                toast({
                  title: "Reset Password Link is sent to your email",
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
      <FormControl>
        <Input
          type="text"
          placeholder="Enter your email address"
          onChange={(e) => setemail(e.target.value)}
        />
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
}

export default Forgotpass
