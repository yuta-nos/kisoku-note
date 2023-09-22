import React, { useEffect } from 'react'
import Signout from './Signout';

// redux
import { useSelector, useDispatch } from "react-redux";
import { setTrue } from '../../store/signinSlice';

// route
import { useParams, useLocation } from 'react-router-dom'

// 非同期処理
import axios from 'axios'

// styling
import { Box, Button, Heading, HStack, Text, Link } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

const Mypage = () => {

  const isSignedIn = useSelector( (state)=>{ return state.signin } );
  const dispatch = useDispatch();

  const params = useParams();
  console.log("params:", params);
  const location = useLocation();
  console.log(location);

  useEffect( ()=>{
    const accesstokenData = localStorage.getItem("access-token");
    if( accesstokenData !== "" ){
      dispatch( setTrue() );
    }
  }, [] );
  
  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      <Heading as="h3" size="md" mb={5}>マイページ</Heading>
      { isSignedIn ? 
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
                  <Td>{location.state.data.name}</Td>
                </Tr>
                <Tr>
                  <Td
                    w="30%" borderRight="1px" borderColor="gray.100" fontSize="sm"
                  >メールアドレス：</Td>
                  <Td>{location.state.data.email}</Td>
                </Tr>
                <Tr>
                  <Td
                    w="30%" borderRight="1px" borderColor="gray.100" fontSize="sm"
                  >所属組織：</Td>
                  <Td>
                  {
                    location.state.data.team_id
                  ? 
                    <p>{location.state.data.team_id}</p>
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