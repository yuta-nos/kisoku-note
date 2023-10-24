import React from 'react'

// styling
import { Box, Heading, Button, Text, HStack } from '@chakra-ui/react'

const page404 = () => {
  return (
    <Box maxW="750px" my={12} mx="auto" p={3}>
      <HStack spacing="10" mb="30">
        <Text fontSize="100px" my="0">404</Text>
        <Text letterSpacing=".2em" >page not found</Text>
      </HStack>
      <Heading as="h3" size="sm" mb="30">ページが見つかりません。</Heading>
      <Text mb="24">正しいURLにアクセスしてください。</Text>
      <Box display='flex' justifyContent='center' alignItems='center' mb="16">
        <Button borderRadius="999" px="10" colorScheme="teal"><a href="/">TOPページ</a></Button>
      </Box>
    </Box>
  )
}

export default page404