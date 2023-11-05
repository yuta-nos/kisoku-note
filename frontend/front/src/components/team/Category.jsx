import React, { useEffect, useState } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetAllCategories } from '../../store/categorySlice';
import { asyncCreateCategoryFromTeam, asyncDeleteCategoryFromTeam } from '../../store/teamSlice';

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
  console.log(teamData);
  const catData = useSelector( (state)=>{ return state.category } );
  const dispatch = useDispatch();

  const sessionData = {
    "access-token": localStorage.getItem("access-token"),
    "client": localStorage.getItem("client"),
    "uid": localStorage.getItem("uid")
  }

  useEffect( ()=>{
    dispatch(asyncGetAllCategories(sessionData));
  }, [] )

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [inputCatName, setInputCatName ] = useState(""); 
  const [thisCatData, setThisCatData] = useState();

  // カテゴリ追加関数
  const addCategory = () => {
    const categoryData = {
      name: inputCatName,
      team_id: teamData.id
    };
    dispatch( asyncCreateCategoryFromTeam( categoryData, sessionData ) );
  };

  // カテゴリ削除関数
  const deleteCategory = () => {
    console.log(thisCatData);
    dispatch( asyncDeleteCategoryFromTeam( thisCatData.id, sessionData ) );
    onClose();
  };

  const navigate = useNavigate();

  return (
    <Box>
      <HStack mb={3}>
        <Text size="sm">管理文書カテゴリ</Text>
        <Spacer />
        <Button
          colorScheme={isOpenAdd ? "gray" :'teal'}
          size='sm'
          onClick={ () => setIsOpenAdd(!isOpenAdd) }
        >{isOpenAdd ? "×" : "カテゴリ追加"}</Button>
      </HStack>
      { isOpenAdd ?
        <HStack mb={5}>
          <Input placeholder='追加カテゴリ名' onChange={(e) => setInputCatName(e.target.value)} />
          <Button onClick={ ()=> {
            addCategory();
            setIsOpenAdd(false);
          } } colorScheme="teal" >追加</Button>
        </HStack>
        :
        <></>
      }
      

      {/* モーダル */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>カテゴリ削除</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text mb={5}><Box as="span" fontWeight="bold">「{thisCatData?.name}」カテゴリ</Box>を削除します。</Text>
              <Text>削除を実行すると<Box as="span" color="red">カテゴリ内の全ての文書</Box>が削除されます。本当によろしいですか？</Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button colorScheme="red" mr={3} onClick={ ()=>deleteCategory() }>削除実行</Button>
              <Button onClick={onClose}>キャンセル</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box>
        {teamData?.categories.map( (category)=>{
          const thisCatDocs = teamData.documents.filter( (doc)=>{
            return doc.category_id === category.id;
          } )
          return(
            <HStack key={category.id} alignItems="top">
              <Box
                mb={3} bgColor="gray.50" p={5} borderRadius={10} w="92%"
                cursor="pointer"
                transition="0.3s"
                _hover={{bgColor: "gray.200"}}
                onClick={ () => { navigate(`/team/${teamData.id}/category/${category.id}`) } }
              >
                <Heading as="h4" size="sm" mb={3}>{category.name}</Heading>
                <Text>管理文書数：{thisCatDocs.length}</Text>
              </Box>
              <Button
                size="sm" _hover={{ bgColor: "gray.300" }}
                onClick={ () => {
                  setThisCatData(category);
                  onOpen();
                } }
              >削除</Button>
            </HStack>
          )
        } )}
        {catData?.some((category) => category.team_id === teamData.id) === false && (
          <Text color="gray.500" ml={5}>カテゴリがまだ登録されていません。</Text>
        )}
      </Box>
    </Box>
  )
}

export default Category