import React, { useState, useEffect } from 'react'

// route
import { useParams, useNavigate } from 'react-router-dom'

// 非同期処理
import axios from 'axios'

// styling
import { Box, Heading, HStack, Button, Spacer, Text } from '@chakra-ui/react'

const DocumentHistory = () => {

  const params = useParams();
  // console.log(params)
  const navigate = useNavigate();

  const [ verData, setVerData ] = useState();
  const [ docName, setDocName ] = useState();

  // session取得
  const sessionData = {
    "access-token": localStorage.getItem("access-token"),
    "client": localStorage.getItem("client"),
    "uid": localStorage.getItem("uid")
  };

  useEffect( ()=>{
    const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/auth/documents/${params.id}`;
    const getDocumentData = async() => {
      await axios.get(ENDPOINT, { headers: sessionData })
      .then( (res)=>{
        console.log(res.data);
        setVerData(res.data.versions);
        setDocName(res.data.title)
      } )
    }
    getDocumentData();
  }, [] ) 

  const formatDate = (dateStr) => {
    const teamSignupDate = new Date(dateStr);
    return teamSignupDate.toLocaleString('ja-JP');
  }

  return (
    <Box maxW="750px" my={12} mx="auto" p={3}>
      <Heading as="h3" size="md" mb={8}>「{docName}」バージョン一覧</Heading>
      <Box mb={5} py={3}>
        <Text borderBottom="1px" borderColor="gray.400" pb={3}>文書管理開始</Text>
      </Box>
      {verData?.sort( (a, b) => { return a.id - b.id } )
        .map( (ver)=>{
        const reasonLine = ver.reason.split('\n'); //改行を変換
        return(
          <Box key={ver.number}>
            <HStack spacing={5} px={5}>
              <Text>↓</Text>
              <Box
                fontSize="sm"
                borderLeft="8px" borderColor="gray.300"
                pl={3}
              >
                <Box mb={3} bgColor="gray.100" w="fit-content" py={1} px={3} borderRadius={10}>変更理由</Box>
                {reasonLine?.map((line, index) => (
                  <Text key={index}>{line}<br /></Text>
                ))}
              </Box>
            </HStack>
            <Box
              p={5} my={8}
              bgColor="gray.100" borderRadius={10} 
            >
              <HStack borderBottom="1px" borderColor="gray.400" pb={3}>
                <Text>バージョン{ver.number}</Text>
                <Spacer />
                <HStack>
                  <Text color="gray.500" fontSize="0.9em" mr={5}>{formatDate(ver.created_at)}</Text>
                  <Button
                    size="xs" bgColor="gray.300"
                    onClick={ ()=>{ navigate(`/document/${params.id}/ver/${ver.number}`) } }
                  >このバージョンを確認</Button>
                </HStack>
              </HStack>
            </Box>
          </Box>
        )
      } )}
    </Box>
  )
}

export default DocumentHistory