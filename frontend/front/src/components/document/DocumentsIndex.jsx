import React, { useEffect, useState } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetDocsInThisCat, asyncDeleteDocsInThisCat } from '../../store/documentSlice';

// route
import { useParams, useNavigate } from 'react-router-dom'

// styling
import { Box, Heading, Text, Button, VStack, HStack, Link, Spacer, useToast } from '@chakra-ui/react'
import {
  useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

const DocumentsIndex = () => {

  const params = useParams();

  // redux用
  const dispatch = useDispatch();
  const targetCat = useSelector( (state) => { return state.document } );
  console.log(targetCat);

  // 認証用データ
  const sessionData = {
    "access-token": localStorage.getItem("access-token"),
    "client": localStorage.getItem("client"),
    "uid": localStorage.getItem("uid")
  }

  // const [ targetCat, setTargetCat ] = useState();

  const toast = useToast();
  
  useEffect( ()=>{
    // const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/categories/${params.category}`;
    // const getTargetCategory = async() => {
    //   const result = await axios.get(ENDPOINT, { params: sessionData })
    //   .then( (res)=>{ console.log("doc data:", res.data); return res.data } );
    //   setTargetCat(result);
    // }
    // getTargetCategory();

    // 初期表示データ取得
    dispatch( asyncGetDocsInThisCat( params.category, sessionData ) );
  }, [] );

  const navigate = useNavigate();

  // 日時データ成形
  const formatDate = (dateStr) => {
    const teamSignupDate = new Date(dateStr);
    return teamSignupDate.toLocaleDateString('ja-JP');
  }

  // 文書削除
  const [ docInfo, setDocInfo ] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = (id) => {
    try{
      dispatch( asyncDeleteDocsInThisCat(id, sessionData) );
      onClose();
      // toast
      toast({
        title: '文書 削除完了',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
    catch(error){
      console.log("error:", error);
      // toast
      toast({
        title: '文書 削除失敗',
        status: 'error',
        duration: 3000,
        isClosable: true,
      }) 
    }
  };

  // 表示箇所
  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      <Heading as="h3" size="md" mb={5}>「{targetCat?.name}」文書一覧</Heading>
      <Box mb={10}>
        <Button colorScheme="teal" onClick={() => {
          navigate("/new-document", { state: params } );
        }}>新規文書作成</Button>
      </Box>
      <Box>
        <Heading as="h4" size="sm" mb={5}>登録済み文書</Heading>
        {targetCat?.documents
          // .sort((a, b) => a.id - b.id)
          .map( (document)=>{
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
                  <Button
                    size="xs" bgColor="gray.300"
                    onClick={ ()=>{
                      setDocInfo(document);
                      onOpen();
                    } }
                  >
                    削除
                  </Button>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>文書の削除</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={5}>「<Box as="span" fontWeight="bold">{docInfo?.title}</Box>」を削除しようとしています。</Text>
            <Text>本当によろしいですか？</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3} colorScheme="red"
              onClick={()=>handleDelete(docInfo.id)}
            >削除実行</Button>
            <Button onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  )
}

export default DocumentsIndex