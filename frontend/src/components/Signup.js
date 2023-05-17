import {
  FormControl,
  FormLabel,
  Button,
  Input,
  VStack,
  useToast,
  InputRightElement,
  InputGroup,
  RadioGroup,
  Radio,
  Stack
} from "@chakra-ui/react";
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'




const Signup = () => {
 
   const [fname, setfname] = useState("");
   const [lname, setlname] = useState("");
   const [email, setemail] = useState("");
   const [phone, setphone] = useState("");
   const [pass, setpass] = useState("");
   const [cpass, setcpass] = useState("");
   const [value, setvalue] = useState("");

   const [loading,setloading] = useState(false)
   const [show,setshow]=useState(false)
   const toast = useToast()
    const handleClick = () => setshow(!show);
    const Navigate = useNavigate()


  const submit = async ()=>{
         setloading(true)
         if (!fname||!lname||!email||!phone||!pass||!cpass||!value) {
            toast({
                title:"Please fill all the fields",
                status:"warning",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })
             setloading(false);
             return
         }
         

          if (pass !== cpass) {
            toast({
              title: "Passwords donot match",
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "bottom",
            });
            setloading(false);
            return;
          }
         try {
            const config ={
                headers:{
                    "Content-type":"application/json"
                }

            }
            const {data} = await axios.post("/api/user",{fname,lname,email,phone,pass,value},config)
                toast({
                  title: "Registration successful",
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
  }

   return (
     <VStack>
       <FormControl id="first-name" isRequired>
         <FormLabel>First Name</FormLabel>
         <Input
           type="text"
           placeholder="Enter your first name"
           onChange={(e) => setfname(e.target.value)}
         />
       </FormControl>
       <FormControl id="last-name" isRequired>
         <FormLabel>Last Name</FormLabel>
         <Input
           type="text"
           placeholder="Enter your last name"
           onChange={(e) => setlname(e.target.value)}
         />
       </FormControl>
       <FormControl id="email" isRequired>
         <FormLabel>Email</FormLabel>
         <Input
           type="email"
           placeholder="Enter your email address"
           onChange={(e) => setemail(e.target.value)}
         />
       </FormControl>
       <FormControl id="number" isRequired>
         <FormLabel>Phone</FormLabel>
         <Input
           type="number"
           placeholder="Enter your phone number"
           onChange={(e) => setphone(e.target.value)}
         />
       </FormControl>
       <FormControl>
         <RadioGroup onChange={setvalue} value={value} m="10px 0 10px 0">
           <Stack direction="row">
             <Radio value="1" name="people">Student</Radio>
             <Radio value="2" name="people">Driver</Radio>
           </Stack>
         </RadioGroup>
       </FormControl>
       <FormControl id="password" isRequired>
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
       <FormControl id="cpassword" isRequired>
         <FormLabel>Confirm Password</FormLabel>
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
         width="100%"
         style={{ marginTop: 15 }}
         onClick={submit}
         isLoading={loading}
       >
         Sign Up
       </Button>
     </VStack>
   );
 
}

export default Signup

