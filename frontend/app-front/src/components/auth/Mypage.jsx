import React, { useEffect, useState } from 'react'
import Signout from './Signout';

// route
import { useLocation, useNavigate } from 'react-router-dom'

// 非同期処理
import axios from 'axios'

// styling
import { Box, Button, Heading, HStack, Text, Link } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

const Mypage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [ userData, setUserData ] = useState("");

  useEffect( ()=>{
    const currentUserData = {
      "access-token": localStorage.getItem("access-token"),
      "client": localStorage.getItem("client"),
      "uid": localStorage.getItem("uid")
    }
    try{
      const getCurrentUser = async() => {
        const result = await axios.get("http://localhost:3000/auth/sessions", { params: currentUserData })
        .then( (res)=>{ return res.data } );
        setUserData(result);
      }
      getCurrentUser();
    }
    catch(error) {
      console.log(error)
    }
  }, [] );
  
  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      <Heading as="h3" size="md" mb={5}>マイページ</Heading>
      { userData.is_login ? 
        <Box my={10}>
          <TableContainer border="2px" borderColor="gray.300">
            <Table variant='simple'>
              <Thead>
                <Tr bgColor="gray.50" borderBottom="2px" borderColor="gray.200">
                  <Th w="30%" borderRight="1px" borderColor="gray.100">ユーザー情報</Th>
                  <Th>登録内容</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td
                    w="30%" borderRight="1px" borderColor="gray.100" fontSize="sm"
                  >名前：</Td>
                  <Td>{userData.data.name}</Td>
                </Tr>
                <Tr>
                  <Td
                    w="30%" borderRight="1px" borderColor="gray.100" fontSize="sm"
                  >メールアドレス：</Td>
                  <Td>{userData.data.email}</Td>
                </Tr>
                <Tr>
                  <Td
                    w="30%" borderRight="1px" borderColor="gray.100" fontSize="sm"
                  >所属組織：</Td>
                  <Td>
                  {
                    userData.team.id
                  ? 
                    <Link
                      onClick={ ()=>{ navigate( `/team/${userData.team.id}` ) } }
                      textDecoration="underline"
                      color="blue.600"
                    >{userData.team.name}</Link>
                  :
                    <HStack>
                      <Text mr={5}>なし</Text>
                      <Button colorScheme="teal">チームを作成する</Button>
                    </HStack>
                  }
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      : 
        <Signout />
      }
    </Box>
  )
}

export default Mypage