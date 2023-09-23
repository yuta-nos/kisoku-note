import React, { useState } from 'react'

// styling
import { Box, Heading, HStack, Spacer, VStack, Text, Button } from "@chakra-ui/react";

const Header = () => {

  const [isSignin, setIsSignin] = useState();

  return (
    <Box p={5} bgColor="gray.100" boxShadow="xl">
      <HStack>
        <Heading as="h1" size="sm">kisoku note</Heading>
        <Spacer />
        <VStack>
          { isSignin ? 
            <Text>⚪︎⚪︎でログイン中</Text>
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