import React, { useState, useEffect } from 'react'
import TextEditor from './TextEditor'

// route
import { useLocation, useParams } from 'react-router-dom'

// 非同期処理
import axios from 'axios'

// styling
import { Box, HStack, Text, Textarea } from '@chakra-ui/react'

const DocumentPage = () => {

  const location = useLocation();
  // console.log(location)
  const params = useParams();
  console.log(params);

  const [ reason, setReason ] = useState();

  useEffect( ()=>{
    const getVersionData = async() => {
      await axios.get(`http://localhost:3000/auth/documents/${params.id}`)
      .then( (res)=>{
        const verData = res.data.versions[params.version - 1].reason;
        console.log(verData)
        const lines = verData.split('\n'); //改行を変換
        setReason(lines);
      } )
    }
    getVersionData();
  }, [] )

  return (
    <Box maxW="750px" my={12} mx="auto" p={3}>
      { params.version == 1 ?
        <></> 
      :
        <Box p={5} border="1px" borderColor="red.500" bgColor="red.50">
          <HStack>
            <Box as="span" py={2} px={5} bgColor="red.100" borderRadius={10}>バージョン{params.version - 1}からの改訂理由</Box>
          </HStack>
          <Box mt={5}>
            {reason?.map((line, index) => (
              <div key={index}>{line}<br /></div>
            ))}
          </Box>
        </Box>
      }
      <TextEditor location={location}/>
    </Box>
  )
}

export default DocumentPage