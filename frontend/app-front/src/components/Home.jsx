import React from 'react'

// styling
import { Box, Button, Divider, Heading, HStack, Spacer, Text, VStack } from '@chakra-ui/react'

const Home = () => {
  return (
    <Box>
      <VStack bgColor="gray.200" py={100} mt={20}>
        <Text textAlign="center" fontSize="lg" mb={5}>組織内の規則管理を、もっとカンタンに。</Text>
        <Button colorScheme="orange">さっそくはじめる</Button>
      </VStack>
      <Box my={50} maxW="650px" mx="auto">
        <Text mb={5}>組織内で作成した規則や、法令対応のための社内文書の管理、混乱していませんか？</Text>
        <HStack alignItems="flex-start">
          <Box w="30%" bgColor="gray.100" p={5}>
            <Heading as="h4" size="sm" textAlign="center" mb={3}>case1</Heading>
            <Divider mb={3} borderColor="gray.400" />
            <Text>どの文書が最新か分からない・・・</Text>
            <Text>同じ名前のファイルが複数ある・・・</Text>
          </Box>
          <Spacer />
          <Box w="30%" bgColor="gray.100" p={5}>
            <Heading as="h4" size="sm" textAlign="center" mb={3}>case2</Heading>
            <Divider mb={3} borderColor="gray.400" />
            <Text>過去につくられた規定の意味が分からない・・・当時の社内でどのようなやり取りがあったのだろう・・・</Text>
          </Box>
          <Spacer />
          <Box w="30%" bgColor="gray.100" p={5}>
            <Heading as="h4" size="sm" textAlign="center" mb={3}>case3</Heading>
            <Divider mb={3} borderColor="gray.400" />
            <Text>どの省令・通知に基づいた規定なのか、記録がない・・・</Text>
          </Box>
        </HStack>
        <Box mt={10}>
          <Text textAlign="center" mb={5}>その悩み、kisoku noteで解消できます</Text>
          <VStack>
            <Box>
              <Text mb={5}>かんたんバージョン管理</Text>
              <Text mb={5}>「変更理由」の保存</Text>
              <Text mb={5}>参照文献保存機能</Text>
            </Box>
          </VStack>
        </Box>
        <VStack my={20}>
          <Button colorScheme="orange">kisoku note をはじめる</Button>
        </VStack>
      </Box>
    </Box>
  )
}

export default Home