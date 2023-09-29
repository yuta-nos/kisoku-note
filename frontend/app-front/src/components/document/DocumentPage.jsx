import React from 'react'
import TextEditor from './TextEditor'

// route
import { useLocation } from 'react-router-dom'

// styling
import { Box } from '@chakra-ui/react'

const DocumentPage = () => {

  const location = useLocation();

  return (
    <Box>
      <TextEditor location={location} />
    </Box>
  )
}

export default DocumentPage