import React, { useEffect, useState } from 'react'

// route
import { useParams, useNavigate } from 'react-router-dom'

// 非同期処理
import axios from 'axios'

// styling
import { Box, Heading, Text, Button } from '@chakra-ui/react'

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
      .then( (res)=>{ console.log(res.data); return res.data } );
      setTargetCat(result);
    }
    getTargetCategory();
  }, [] );

  const navigate = useNavigate();

  const addDocument = () => {
    navigate("/new-document", { state: params } );
  }

  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      <Heading as="h3" size="md" mb={5}>「{targetCat?.name}」文書一覧</Heading>
      <Box mb={10}>
        <Button colorScheme="teal" onClick={addDocument}>新規文書作成</Button>
      </Box>
      <Box>
        <Heading as="h4" size="sm" mb={5}>登録済み文書</Heading>
        {targetCat?.documents
          .sort((a, b) => a.id - b.id)
          .map( (document)=>{
          return(
            <Box
              key={document.id}
              bgColor="gray.100"
              p={5}
              m={3}
              cursor="pointer"
              transition="0.3s"
              _hover={{bgColor: "gray.200"}}
              onClick={ () => { navigate(`/document/${document.doc_num}`) } }
            >
              <Text>{document.title}</Text>
            </Box>
          )
        } )}
        { targetCat?.documents.length === 0 ? 
          <Text color="gray.500">まだ文書が登録されていません</Text>
        :
          <Text></Text>
        }
      </Box>
    </Box>
  )
}

export default DocumentsIndex