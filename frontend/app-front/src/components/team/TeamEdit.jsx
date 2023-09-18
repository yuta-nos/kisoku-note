import React, { useState } from 'react'

// route
import { useLocation } from 'react-router-dom'

// styling
import { Box, Text, HStack, Input, Button } from '@chakra-ui/react'
import {
  Table, Thead, Tbody, Tfoot,
  Tr, Th, Td,
  TableCaption, TableContainer,
} from '@chakra-ui/react'

const TeamEdit = () => {

  const location = useLocation();
  console.log(location);

  const [teamName, setTeamName] = useState(location.state.name);
  const editTeamName = (e) => {
    setTeamName(e.target.value);
  }

  const deleteMember = (id) => {
    console.log(id);
  }

  return (
    <Box maxW="650px" my={12} mx="auto" p={3} >
      <HStack mb={3}>
        <Text size="sm">組織情報</Text>
      </HStack>
      <HStack mb={3} bgColor="gray.50" p={5} borderRadius={10}>
        <Text w="60px" fontSize="sm">組織名</Text>
        <Input bgColor="white" placeholder="⚪︎⚪︎株式会社" value={teamName} onChange={(e)=>editTeamName(e)}></Input>
        <Button
          colorScheme='teal'
          size='sm'
        >更新</Button>
      </HStack>
      <Box mb={5} bgColor="gray.50" p={5}  borderRadius={10}>        
        <Box mb={3}>
          <Text mb={3}>所属メンバー：</Text>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>id</Th>
                  <Th>名前</Th>
                  <Th>メール</Th>
                  <Th>削除</Th>
                </Tr>
              </Thead>
              <Tbody>
                {location.state.users.map( (member)=>{
                  return(
                    <Tr key={member.id}>
                      <Td>{member.id}</Td>
                      <Td>{member.name}</Td>
                      <Td>{member.email}</Td>
                      <Td> 
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={()=>deleteMember(member.id)}
                        >削除</Button>
                      </Td>
                    </Tr>
                  )
                } )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        {/* <Text>利用開始日：{teamData?.created_at && formatDate(teamData.created_at)} */}
        {/* </Text> */}
      </Box>
    </Box>
  )
}

export default TeamEdit