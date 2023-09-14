import React from 'react'

// styling
import { Box, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box p={5} bgColor="gray.100" boxShadow="xl">
      <Heading as="h1" size="sm">kisoku note</Heading>
    </Box>
  )
}

export default Header