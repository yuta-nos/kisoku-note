import React, { useState } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { asyncSetSession } from '../../store/signinSlice';

// route
import { useNavigate } from 'react-router-dom';

// 非同期処理
import axios from 'axios';

// styling
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";

const TeamCreate = () => {

  const [ inputName, setInputName ] = useState();
  const [ teamId, setTeamId ] = useState();

  const userData = useSelector( (state)=>{ return state.signin } );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createTeam = async() => {
    const currentUserData = {
      "access-token": localStorage.getItem("access-token"),
      "client": localStorage.getItem("client"),
      "uid": localStorage.getItem("uid")
    }
    dispatch( asyncSetSession(currentUserData) )
    const teamData = {
      name: inputName,
      user_id: userData.id
    }

    // チームデータ作成
    try {
      await axios.post("http://localhost:3000/auth/teams", teamData, { headers: currentUserData } )
      .then( (res)=>{ axios.put("http://localhost:3000/auth", { team_id: res.data.id }, { headers: currentUserData })
      .then( (res)=>{ 
        console.log(res.data);
        navigate(`/mypage/${res.data.id}`);
      } ); } );
    } catch(error){
      console.log(error);
    }
  
  }

  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      <Heading as="h3" size="md" mb={5}>組織登録</Heading>
      <Box mb={5}>
        <Text>組織名：</Text>
        <Input onChange={ (e)=>{ setInputName(e.target.value) } } />
      </Box>
      <Box>
        <Button
          colorScheme="teal"
          onClick={ createTeam }
        >作成</Button>
      </Box>
    </Box>
  )
}

export default TeamCreate