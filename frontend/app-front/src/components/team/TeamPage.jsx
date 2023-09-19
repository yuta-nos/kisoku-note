import React,{ useEffect } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetTeam } from '../../store/teamSlice'

// route
import { useNavigate, useParams } from 'react-router-dom'

// 非同期
// import axios from 'axios'

// styling
import { Box, Button, Text, Spacer, Tag, Avatar, TagLabel, HStack } from '@chakra-ui/react'

const TeamPage = () => {

  const team = useSelector( (state)=>{ return state.team } );
  const dispatch = useDispatch();

  let param = useParams();

  // const [teamData, setTeamData] = useState();

  useEffect( ()=>{
    dispatch( asyncGetTeam(param.id) );
    // const getTeam = async() => {
    //   const result = await axios.get(`http://localhost:3000/teams/${param.id}`)
    //   .then( (res)=>{ return res.data } );
    //   setTeamData(result);
    // }
    // getTeam();
  }, [] );

  const formatDate = (dateStr) => {
    const teamSignupDate = new Date(dateStr);
    return teamSignupDate.toLocaleString('ja-JP');
  }

  const navigate = useNavigate();

  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      <HStack mb={3}>
        <Text size="sm">組織情報</Text>
        <Spacer />
        <Button
          colorScheme='teal'
          variant='outline'
          size='sm'
          onClick={ ()=>{ navigate(`/team/${param.id}/edit`, {state: team}) } }
        >組織情報を編集する（管理者のみ）</Button>
      </HStack>
      <Box mb={3} bgColor="gray.50" p={5} borderRadius={10}>
        <Text fontWeight="bold">{team?.name}</Text>
      </Box>
      <Box mb={5} bgColor="gray.50" p={5}  borderRadius={10}>        
        <Box mb={3}>
          <Text mb={3}>所属メンバー：</Text>
          {team?.users.map( (member)=>{
            return(
              <Tag
                size='lg'
                colorScheme='blue'
                borderRadius='full'
                mr={3}
                mb={3}
                key={member.uid}
              >
                <Avatar
                  src=''
                  size='xs'
                  name={member.name}
                  ml={-1}
                  mr={2}
                />
                <TagLabel>{member.name}</TagLabel>
              </Tag>
            )
          } )}
        </Box>
        <Text>利用開始日：{team?.created_at && formatDate(team.created_at)}
        </Text>
      </Box>

      <Box mb={5}>
      <HStack mb={3}>
        <Text size="sm">管理文書</Text>
        <Spacer />
        <Button
          colorScheme='teal'
          size='sm'
        >文書登録</Button>
      </HStack>
      </Box>
    </Box>
  )
}

export default TeamPage