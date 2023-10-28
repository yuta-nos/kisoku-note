import React from 'react'

// styling
import { Box, Text, Link } from '@chakra-ui/react'

const Signout = () => {
  return (
    <Box>
      <Text mb={5}>ログアウト中です。以下からログインしてください。</Text>
      <Link
        color="blue.600"
        textDecoration="underline"
        href="/signin"
      >ログイン</Link>
    </Box>
  )
}

export default Signout