import React, { useEffect, useState } from 'react'

// route
import { useParams } from 'react-router-dom'

// 非同期処理
import axios from 'axios'

// styling
import { Box, Heading, Text } from '@chakra-ui/react'

const DocumentsIndex = () => {

  const params = useParams();

  const sessionData = {
    "accesstoken": localStorage.getItem("access-token"),
    "client": localStorage.getItem("client"),
    "uid": localStorage.getItem("uid")
  }

  const [ targetCat, setTargetCat ] = useState();
  
  useEffect( ()=>{
    const getTargetCategory = async() => {
      const result = await axios.get(`http://localhost:3000/auth/categories/${params.category}`, { params: sessionData })
      .then( (res)=>{ console.log(res.data.data); return res.data } );
      setTargetCat(result.data);
    }
    getTargetCategory();
  }, [] )

  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      <Heading as="h3" size="md">「{targetCat?.name}」文書一覧</Heading>
      <Text></Text>
    </Box>
  )
}

export default DocumentsIndex