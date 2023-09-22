import React, { useState, useEffect } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setTrue, setFalse } from '../store/signinSlice';

// route
import { useNavigate } from "react-router-dom";

// styling
import { Box, Heading, HStack, Spacer, VStack, Text, Button } from "@chakra-ui/react";

const Header = () => {

  const isSignedIn = useSelector( (state)=>{ return state.signin } );
  console.log(isSignedIn);
  const dispatch = useDispatch();

  const [accessToken, setAccessToken] = useState();
  const [client, setClient] = useState();
  const [uid, setUid] = useState();

  useEffect( ()=>{
    const accesstoken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
    console.log(accesstoken, client, uid);
    if( accesstoken !== "" && client !== "" && uid !== "" ){
      setUid(uid);
    }
  }, [isSignedIn] )

  const navigate = useNavigate();

  const deleteSession = () => {
    localStorage.setItem("access-token", "");
    localStorage.setItem("client", "");
    localStorage.setItem("uid", "");
    navigate("/mypage/1");
    dispatch( setFalse() );
  }

  return (
    <Box p={5} bgColor="gray.100" boxShadow="xl">
      <HStack>
        <Heading as="h1" size="sm">kisoku note</Heading>
        <Spacer />
        <VStack>
          { isSignedIn ? 
            <HStack>
              <Text mr={3}>{uid}</Text>
              <Button
                size="xs" bgColor="gray.300"
                onClick={ deleteSession }
              >ログアウト</Button>
            </HStack>
            :
            <Button 
              size="xs"
              bgColor="gray.300"
              onClick={ ()=>{ navigate("/signin") } }
            >ログイン</Button>
          }
        </VStack>
      </HStack>

    </Box>
  )
}

export default Header