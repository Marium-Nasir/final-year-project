import React from 'react';
import { useState ,useEffect} from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    Text,
    Button,
    Card,
    CardBody, 
    CardFooter,
    Image,
    Stack,
    Heading,
    Divider,
    ButtonGroup
  } from "@chakra-ui/react";
  

const Driver = () => {
    const [user,setUser]=useState({});
  useEffect(()=>{
    const username = JSON.parse(localStorage.getItem("userInfo"));
    setUser(username);

  },[])
  return (
    <>
      <Box
      display="flex"
      justifyContent="space-between"
      w="100vw"
        alignItems={'center'}
      bg={"white"}
      color={"black"}
      p={"5px 10px 5px 10px"}
      borderWidth={"5px"}
      flexDirection="row"
    >
      <Text fontSize={"2xl"} fontWeight={"bold"} color={"gray"}>
        KU Students Solutions
      </Text>
      
        <Menu>
          <MenuButton as={Button}>{user.fname} {user.lname}</MenuButton>
          <MenuList>
            <MenuItem>User Profile</MenuItem>
            <MenuItem>Log Out</MenuItem>
          </MenuList>
        </Menu>
      
    </Box>

    <Box
    display="flex"
    justifyContent="space-evenly"
    w="100vw"
      alignItems={'center'}
    bg={"white"}
    color={"black"}
    p={"5px 10px 5px 10px"}
    borderWidth={"5px"}
    flexDirection="row"
    height="90%"
    >
    
<Card maxW='sm'>
  <CardBody>
    <Image
      src='https://th.bing.com/th/id/OIP.fiehj1hHdS2Cs6iDELw9ZQHaCu?pid=ImgDet&rs=1'
      alt='Tracking App'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='4'>
      <Heading size='md'>Tracking App</Heading>
      <Text>
        This feature is for tracking the points which helps to track points from everywhere  
      </Text>
      
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Goto Tracking App
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
    </Box>
    </>
  )
}

export default Driver
