import React, { useEffect } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { asyncSetSession, asyncDeleteSession } from "../store/signinSlice";

// 非同期処理
// import axios from 'axios';

// route
import { useNavigate } from "react-router-dom";

// styling
import { Box, Heading, HStack, Spacer, VStack, Text, Button, Link } from "@chakra-ui/react";

const Header = () => {

  const sessionState = useSelector( (state)=>{ return state.signin } );
  const dispatch = useDispatch();

  useEffect( ()=>{
    const currentUserData = {
      "access-token": localStorage.getItem("access-token"),
      "client": localStorage.getItem("client"),
      "uid": localStorage.getItem("uid")
    }
    console.log(currentUserData)
    try{
      dispatch( asyncSetSession(currentUserData) );
    }
    catch(error) {
      console.log(error)
    }
  }, [] )

  const navigate = useNavigate();

  const deleteSession = () => {
    const sessionData = {
      "access-token": localStorage.getItem("access-token"),
      "client": localStorage.getItem("client"),
      "uid": localStorage.getItem("uid")
    };
    // axios.delete("http://localhost:3000/auth/sign_out", { params: sessionData })
    // .then( (res)=>{
    //   console.log(res.data);
    //   navigate("/");
    // } );
    dispatch( asyncDeleteSession(sessionData) );
    localStorage.setItem("access-token", "");
    localStorage.setItem("client", "");
    localStorage.setItem("uid", "");
    navigate("/");
  }

  return (
    <Box p={5} bgColor="gray.100" boxShadow="xl">
      <HStack>
        <Heading as="h1" size="sm">
          <Link onClick={ ()=>{ navigate(`/`) } }>kisoku note</Link>
        </Heading>
        <Spacer />
        <VStack>
          {sessionState.is_login ? 
            <HStack>
              <Link
                color="blue.600"
                textDecoration="underline"
                onClick={ ()=>{ navigate(`/mypage/${sessionState.id}`) } }
              >
                <Text mr={3}>{sessionState.name}</Text>
              </Link>
              <Button
                size="xs" bgColor="gray.300"
                onClick={ deleteSession }
              >ログアウト</Button>
            </HStack>
          :
            <Box>
              <Button 
                size="xs"
                bgColor="gray.300"
                onClick={ ()=>{ navigate("/signin") } }
              >ログイン</Button>
            </Box>
          }
        </VStack>
      </HStack>

    </Box>
  )
}

export default Header