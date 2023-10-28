import React from 'react'

// styling
import { Box, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box w="100%" p={10} bgColor="gray.50" color="gray.500">
      {/* <HStack fontSize="sm">
        <Link>ログイン</Link>
        <Spacer />
        <Link>ログイン</Link>
        <Spacer />
        <Link>ログイン</Link>
      </HStack> */}
      <Text textAlign="center" >kisoku note</Text>
    </Box>
  )
}

export default Footer