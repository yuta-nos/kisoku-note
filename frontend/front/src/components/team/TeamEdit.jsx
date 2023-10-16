import React, { useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { asyncUpdateTeamName } from '../../store/teamSlice'

// route
import { useLocation, useNavigate } from 'react-router-dom'

// styling
import { Box, Text, HStack, Input, Button } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

const TeamEdit = () => {

  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState(location.state.name);
  const editTeamName = (e) => {
    setTeamName(e.target.value);
  }
  const updateTeamName = (data) => {
    const newData = {
      id: data.id,
      name: teamName
    }
    dispatch( asyncUpdateTeamName(newData) )
    .then( ()=>{ navigate(`/team/${location.state.id}`) } );
  }

  const deleteMember = (id) => {
    console.log(id);
  }

  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      <HStack mb={3}>
        <Text size="sm">組織情報</Text>
      </HStack>
      <HStack mb={3} bgColor="gray.50" p={5} borderRadius={10}>
        <Text w="60px" fontSize="sm">組織名</Text>
        <Input
          bgColor="white"
          placeholder="⚪︎⚪︎株式会社"
          value={teamName}
          onChange={(e)=>editTeamName(e)}
        ></Input>
        <Button
          colorScheme='teal'
          size='sm'
          onClick={()=>updateTeamName(location.state)}
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
      </Box>
    </Box>
  )
}

export default TeamEdit