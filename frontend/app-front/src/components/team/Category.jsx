import React, { useEffect, useState } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetCategory, asyncCreateCategory } from '../../store/categorySlice';

// route
import { useNavigate } from "react-router-dom";

// styling
import { Box, Heading, Text, Spacer, HStack, Button, Input } from '@chakra-ui/react';
import {
  useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

const Category = () => {

  const teamData = useSelector( (state)=>{ return state.team } );
  const catData = useSelector( (state)=>{ return state.category } );
  const dispatch = useDispatch();

  const sessionData = {
    "accesstoken": localStorage.getItem("access-token"),
    "client": localStorage.getItem("client"),
    "uid": localStorage.getItem("uid")
  }

  useEffect( ()=>{
    dispatch(asyncGetCategory(sessionData));
  }, [] )

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputCatName, setInputCatName ] = useState(); 

  const addCategory = () => {
    const categoryData = {
      name: inputCatName,
      team_id: teamData.id
    };
    // axios.post("http://localhost:3000/auth/categories", categoryData, { headers: sessionData })
    // .then( (res)=>{
    //   console.log(res.data);
    // } );
    dispatch( asyncCreateCategory( categoryData, sessionData ) );
    onClose();
  };

  const navigate = useNavigate();

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
        {catData?.map( (category)=>{
          if( category.team_id === teamData.id ){
            return(
              <Box
                key={category.id}
                mb={3} bgColor="gray.50" p={5} borderRadius={10}
                cursor="pointer"
                transition="0.3s"
                _hover={{bgColor: "gray.200"}}
                onClick={ () => { navigate(`/team/${teamData.id}/${category.id}`) } }
              >
                <Heading as="h4" size="sm" mb={3}>{category.name}</Heading>
                <Text>管理文書数：</Text>
              </Box>
            )
          }
        } )}
        {catData?.some((category) => category.team_id === teamData.id) === false && (
          <Text color="gray.500" ml={5}>カテゴリがまだ登録されていません。</Text>
        )}
      </Box>
    </Box>
  )
}

export default Category