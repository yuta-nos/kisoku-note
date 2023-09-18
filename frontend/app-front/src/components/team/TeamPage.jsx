import React,{ useEffect, useState } from 'react'

// route
import { useParams } from 'react-router-dom'

// 非同期
import axios from 'axios'

// styling
import { Box, Button, Text, Heading, Spacer, Tag, Avatar, TagLabel, HStack } from '@chakra-ui/react'

const TeamPage = () => {

  let param = useParams();

  const [teamData, setTeamData] = useState();

  useEffect( ()=>{
    const getTeam = async() => {
      const result = await axios.get(`http://localhost:3000/teams/${param.id}`)
      .then( (res)=>{ return res.data.data } );
      setTeamData(result);
    }
    getTeam();
  }, [] );

  const formatDate = (dateStr) => {
    const teamSignupDate = new Date(dateStr);
    return teamSignupDate.toLocaleString('ja-JP');
  }

  return (
    <Box maxW="600px" my={12} mx="auto" p={3} >
      <HStack mb={3}>
        <Text size="sm">組織情報</Text>
        <Spacer />
        <Button
          colorScheme='teal'
          variant='outline'
          size='sm'
        >組織情報を編集する（管理者のみ）</Button>
      </HStack>
      <Box mb={3} bgColor="gray.50" p={5} borderRadius={10}>
        <Text fontWeight="bold">{teamData?.name}</Text>
      </Box>
      <Box mb={5} bgColor="gray.50" p={5}  borderRadius={10}>        
        <Text mb={3}>利用開始日：{teamData?.created_at && formatDate(teamData.created_at)}
        </Text>
        <Box>
          <Text mb={3}>所属メンバー：</Text>
          <Tag size='lg' colorScheme='red' borderRadius='full'>
            <Avatar
              src=''
              size='xs'
              name='Taro Yamada'
              ml={-1}
              mr={2}
            />
            <TagLabel>Tarou Yamada</TagLabel>
          </Tag>
        </Box>
      </Box>

      <Box mb={5}>
      <HStack mb={3}>
        <Text size="sm">管理文書</Text>
        <Spacer />
        <Button
          colorScheme='teal'
          size='sm'
        >文書登録</Button>
      </HStack>
      </Box>
    </Box>
  )
}

export default TeamPage