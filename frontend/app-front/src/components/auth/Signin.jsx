import React,{ useState } from 'react'

// 非同期処理
import axios from "axios";

// route
import { useNavigate } from "react-router-dom";

// styling
import { Box, Input, Button, Heading, Text } from "@chakra-ui/react";

const Signin = () => {

  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

  const navigate = useNavigate();

  const trySignin = async() => {
    const signinData = {
      email: inputEmail,
      password: inputPassword
    }
    const result = await axios.post("http://localhost:3000/auth/sign_in", signinData)
    .then( (res)=>{
      console.log(res);
      if( res.status === 200 ){
        navigate('/')
      }
    } );
  }

  return (
    <Box
      my={20} mx="auto" maxW="500px" p={10}
      bgColor="gray.100" borderRadius={5} boxShadow="lg" >
      <Box>
        <Heading as="h2" size="sm" mb={5}>ユーザーログイン</Heading>
        <Box>
          <Text>メールアドレス：</Text>
          <Input bgColor="white" mb={5} onChange={ (e)=>{ setInputEmail(e.target.value) } } />
        </Box>
        <Box>
          <Text>パスワード：</Text>
          <Input bgColor="white" mb={5} type="password" onChange={ (e)=>{ setInputPassword(e.target.value) } } />
        </Box>
        <Button colorScheme='teal' onClick={trySignin}>send</Button>
      </Box>
    </Box>
  )
}

export default Signin