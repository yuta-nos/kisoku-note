import React from 'react'
import TextEditor from './TextEditor'

// route
import { useLocation } from "react-router-dom";

// styling
import { Box, Heading } from '@chakra-ui/react'

const NewDocument = () => {

  const location = useLocation();

  return (
    <Box maxW="750px" my={12} mx="auto" p={3}>
      <Heading as="h3" size="md" >新規作成</Heading>
      <TextEditor location={location} />
    </Box>
  )
}

export default NewDocument