import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import Resetpass from "../components/Resetpass";
const ResetPassPage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="2xl" fontFamily="Work sans">
          Reset your Password
        </Text>
      </Box>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
     
      >
      
          <Resetpass />
   
      </Box>
    </Container>
  );
};

export default ResetPassPage;
