import React, { useEffect, useState } from 'react'

// route
import { useLocation } from 'react-router-dom';

// 非同期処理
import axios from 'axios'

// styling
import { Box, Heading, Text, Spacer, HStack, Button, Input } from '@chakra-ui/react';
import {
  useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

const Category = () => {

  const [categories, setCategories] = useState();

  useEffect( ()=>{
    const getCategories = async() => {
      const result = await axios.get("http://localhost:3000/categories")
      .then( (res)=>{ return res.data } );
      setCategories(result.data);
    }
    getCategories();
  }, [] )

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputCatName, setInputCatName ] = useState(); 

  const location = useLocation();

  const addCategory = () => {
    const categoryData = {
      name: inputCatName,
      team_id: location.state.team_id
    }
    axios.post("http://localhost:3000/categories", categoryData)
    .then( (res)=>{
      console.log(res.data);
    } );
    onClose();
  }

  return (
    <Box>
      <HStack mb={3}>
        <Text size="sm">管理文書カテゴリ</Text>
        <Spacer />
        <Button
          colorScheme='teal'
          size='sm'
          onClick={ onOpen }
        >カテゴリ追加</Button>
      </HStack>

      {/* カテゴリ追加のmodal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>カテゴリ名</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={ (e)=>{ setInputCatName(e.target.value) } } />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal" mr={3}
              onClick={ addCategory }
            >追加</Button>
            <Button onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box>
        {categories?.map( (category)=>{
          if( category.team_id === 1 ){
            return(
              <Box
                mb={3} bgColor="gray.50" p={5} borderRadius={10}
                key={category.id}
              >
                <Heading as="h4" size="sm" mb={3}>{category.name}</Heading>
                <Text>管理文書数：</Text>
              </Box>
            )
          }
        } )}
      </Box>
    </Box>
  )
}

export default Category