import React, { useState } from 'react'

// route
import { useNavigate } from 'react-router-dom';

// 非同期処理
import axios from 'axios';

// styling
import { Box, Input, Button, Heading, Text, useToast } from "@chakra-ui/react";

const Signup = () => {

  const [inputName, setInputName] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

  const navigate = useNavigate();

  const toast = useToast()

  const trySignup = async() => {
    console.log(inputEmail, inputPassword);
    const userData = {
      name: inputName,
      email: inputEmail,
      password: inputPassword
    };
    try{
      await axios.post("http://localhost:3000/auth", userData)
      .then( (res)=>{ 
        if( res.status === 200 ){
          navigate(`/mypage/${res.data.data.id}`);
          toast({
            title: 'ユーザー登録成功',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      } )
    }
    catch(error){
      console.log(error);
      toast({
        title: "登録失敗",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box
      my={20} mx="auto" maxW="500px" p={10}
      bgColor="gray.100" borderRadius={5} boxShadow="lg" >
      <Box>
        <Heading as="h2" size="sm" mb={5}>ユーザー登録</Heading>
        <Box>
          <Text>名前：</Text>
          <Input bgColor="white" mb={5} onChange={ (e)=>{ setInputName(e.target.value) } } />
        </Box>
        <Box>
          <Text>メールアドレス：</Text>
          <Input bgColor="white" mb={5} onChange={ (e)=>{ setInputEmail(e.target.value) } } />
        </Box>
        <Box>
          <Text>パスワード：</Text>
          <Input bgColor="white" mb={5} type="password" onChange={ (e)=>{ setInputPassword(e.target.value) } } />
        </Box>
        <Button colorScheme='teal' onClick={trySignup}>送信</Button>
      </Box>
    </Box>
  )
}

export default Signup