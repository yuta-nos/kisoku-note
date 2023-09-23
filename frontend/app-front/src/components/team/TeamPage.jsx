import React,{ useEffect } from 'react'
import Category from './Category'
import Signout from '../auth/Signout'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetTeam } from '../../store/teamSlice'
import { setTrue } from '../../store/signinSlice'

// route
import { useNavigate, useParams } from 'react-router-dom'

// 非同期
// import axios from 'axios'

// styling
import { Box, Button, Text, Spacer, Tag, Avatar, TagLabel, HStack } from '@chakra-ui/react'

const TeamPage = () => {

  const team = useSelector( (state)=>{ return state.team } );
  const isSignedIn = useSelector( (state)=>{ return state.signin } );
  const dispatch = useDispatch();

  let param = useParams();

  // const [teamData, setTeamData] = useState();

  useEffect( ()=>{
    // ページ読み込み時にteamのデータを取得
    dispatch( asyncGetTeam(param.id) );
    // ログイン状態を判定
    const accesstokenData = localStorage.getItem("access-token");
    if( accesstokenData !== "" ){
      dispatch( setTrue() );
    };
  }, [] );

  const formatDate = (dateStr) => {
    const teamSignupDate = new Date(dateStr);
    return teamSignupDate.toLocaleString('ja-JP');
  }

  const navigate = useNavigate();

  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      { isSignedIn ? 
        <Box>
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
          <Category />
          </Box>
        </Box>
      :
        <Signout />
      }
    </Box>
  )
}

export default TeamPage