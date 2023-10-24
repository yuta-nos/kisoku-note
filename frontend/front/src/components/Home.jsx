import React from 'react'

// route
import { useNavigate } from "react-router-dom";

// styling
import { Box, Button, Divider, Heading, Stack, Spacer, Text, VStack, Image, Wrap, WrapItem } from '@chakra-ui/react'

const Home = () => {

  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction={['column', 'row']} py={50}>
        <Box w={["100%","40%"]} display="flex" justifyContent="center" mb={5}>
          <Image src="/images/702.png" w="70%" ml={["", "auto"]}/>
        </Box>
        <VStack
          w={["90%","50%"]} mx="auto" py={["10", "15"]} px={["10", "20"]}
          display="flex" justifyContent="center"
          bgColor="gray.50" borderRadius={10}
        >
          <Text textAlign="center" fontSize="lg" fontWeight="bold" mb={5}>文書のバージョン管理を、もっと手軽に。</Text>
          <Text mb={2}>管理が混乱しがちな、組織内の規則や法令対応手順を定めた社内文書の管理。</Text>
          <Text mb={5}>kisoku-noteなら、直感的な操作だけで、文章のバージョン管理がオンラインで完結します。</Text>
          <Button
            colorScheme="orange"
            onClick={ ()=>{ navigate("/signup") } }
          >さっそくはじめる</Button>
        </VStack>
      </Stack>
      <Box bgColor="gray.100" py={26}>
        <Box my={12} maxW="750px" mx="auto" px={5}>
          <Text mb={6} fontWeight="bold">こんな悩みはありませんか？</Text>
          <Text mb={12}>組織内の規則などの社内文書は、ついつい管理が煩雑にになりがちなもの。例えばこんなケースはありませんか？</Text>
          <Stack direction={['column', 'row']} >
            <Box w={['100%', '30%']} bgColor="white" p={5}>
              <Heading as="h4" size="sm" textAlign="center" mb={3}>case1</Heading>
              <Divider mb={3} borderColor="gray.400" />
              <Text>どの文書が最新か分からない・・・</Text>
              <Text>同じ名前のファイルが複数ある・・・</Text>
              <Image src="/images/207.png" />
            </Box>
            <Spacer />
            <Box w={['100%', '30%']} bgColor="white" p={5}>
              <Heading as="h4" size="sm" textAlign="center" mb={3}>case2</Heading>
              <Divider mb={3} borderColor="gray.400" />
              <Text>過去に文書が修正されているが、修正理由が今となってはわからない・・・</Text>
              <Image src="/images/934.png" />
            </Box>
            <Spacer />
            <Box w={['100%', '30%']} bgColor="white" p={5}>
              <Heading as="h4" size="sm" textAlign="center" mb={3}>case3</Heading>
              <Divider mb={3} borderColor="gray.400" />
              <Text>いろんなフォルダに散らばっているから、改訂履歴を整理するだけでも一苦労・・・</Text>
              <Image src="/images/1149.png" />
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box my={12} maxW="900px" mx="auto" px={5}>
        <Text mb={5} fontWeight="bold">その悩み、kisoku noteで解消できます</Text>
        <Stack direction={['column', 'row']} mb={6} spacing="5%">
          <Box w={["100%","45%"]}>
            <li mb={6}>カテゴリ分類機能</li>
            <Image src="/images/example_categories.png" boxShadow="xl" borderRadius={10} />
          </Box>
          <Box w={["100%","45%"]}>
            <li mb={6}>かんたんバージョン管理</li>
            <Image src="/images/example_update.png" boxShadow="xl" borderRadius={10}  />
          </Box>
        </Stack>
        <Stack direction={['column', 'row']} spacing="5%">
          <Box w={["100%","45%"]}>
            <li mb={6}>バージョン更新履歴の自動作成</li>
            <Image src="/images/example_versions.png" boxShadow="xl" borderRadius={10}  />
          </Box>
          <Box w={["100%","45%"]}>
            <li mb={6}>「バージョン更新理由」の表示</li>
            <Image src="/images/example_reason.png" boxShadow="xl" borderRadius={10}  />
          </Box>
        </Stack>
      </Box>
      <VStack my={20}>
        <Button
          colorScheme="orange"
          onClick={ ()=>{ navigate("/signup") } }
        >kisoku note をはじめる</Button>
      </VStack>
      </Box>
  )
}

export default Home