import React, { useEffect, useState } from 'react'

// route
import { useParams, useNavigate } from 'react-router-dom'

// 非同期処理
import axios from 'axios'

// styling
import { Box, Heading, Text, Button, VStack, HStack, Link, Spacer } from '@chakra-ui/react'

const DocumentsIndex = () => {

  const params = useParams();

  const sessionData = {
    "access-token": localStorage.getItem("access-token"),
    "client": localStorage.getItem("client"),
    "uid": localStorage.getItem("uid")
  }

  const [ targetCat, setTargetCat ] = useState();
  
  useEffect( ()=>{
    const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/categories/${params.category}`;
    const getTargetCategory = async() => {
      const result = await axios.get(ENDPOINT, { params: sessionData })
      .then( (res)=>{ console.log(res.data); return res.data } );
      setTargetCat(result);
    }
    getTargetCategory();
  }, [] );

  const navigate = useNavigate();

  const addDocument = () => {
    navigate("/new-document", { state: params } );
  }

  const formatDate = (dateStr) => {
    const teamSignupDate = new Date(dateStr);
    return teamSignupDate.toLocaleDateString('ja-JP');
  }

  const handleDelete = async (id) => {
    const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/documents/${id}`;
    console.log(id);
    await axios.delete(ENDPOINT, { headers: sessionData }).then( (res)=>{ console.log(res.data) } );
  };

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
            const id = document.id;
            const thisDocVers = targetCat?.versions.filter( (ver)=>{
              return ver.document_id === document.id;
            } )
            return(
              <Box
                key={document.id}
                bgColor="gray.100"
                p={5}
                m={3}
              >
                <HStack
                  my={3}
                  borderBottom="1px" pb={5} borderColor="gray.400"
                >
                  <Heading as="h3" size="sm" >{document.title}</Heading>
                  <Spacer/>
                  <Link
                    onClick={ ()=>{ navigate(`/document/${document.doc_num}/history`) } }
                  >この文書の更新履歴を見る</Link>
                  <Link
                    onClick={ ()=>{ handleDelete(id) } }
                  >[削除]</Link>
                </HStack>
                <VStack align="left">
                  {thisDocVers
                    .sort( (a, b)=>{
                      return a.id - b.id 
                    } )
                    .map( (ver)=>{
                    return(
                      <HStack key={ver.id} my={2}>
                        <Button
                          bgColor="blue.100"
                          mr={5}
                          transition="0.3s"
                          _hover={{bgColor: "blue.200"}}
                          onClick={ () => {
                            navigate(`/document/${document.doc_num}/ver/${ver.number}`, { state: document })
                          } }
                        >バージョン{ver.number}</Button>
                        <Text>作成日：{formatDate(ver.created_at)}</Text>
                      </HStack>
                    )
                  } )}
                </VStack>
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