import React, { useState, useEffect } from 'react'

// styling
import { Box, Heading, HStack, Spacer, VStack, Text, Button } from "@chakra-ui/react";

const Header = () => {

  const [isSignedIn, setIsSignedIn] = useState();
  const [uid, setUid] = useState();

  useEffect( ()=>{
    const accesstoken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
    console.log(accesstoken, client, uid);
    if( accesstoken !== "" && client !== "" && uid !== "" ){
      setIsSignedIn(true);
      setUid(uid);
    }
  }, [] )

  return (
    <Box p={5} bgColor="gray.100" boxShadow="xl">
      <HStack>
        <Heading as="h1" size="sm">kisoku note</Heading>
        <Spacer />
        <VStack>
          { isSignedIn ? 
            <Text>{uid}</Text>
            :
            <Button 
              size="sm"
              bgColor="gray.300"
            >ログイン</Button>
          }
        </VStack>
      </HStack>

    </Box>
  )
}

export default Header