import React,{ useState } from 'react'

// 非同期処理
import axios from "axios";

// route
import { useNavigate } from "react-router-dom";

// styling
import { Box, Input, Button, Heading, Text, useToast } from "@chakra-ui/react";

const Signin = () => {

  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

  const navigate = useNavigate();

  const toast = useToast()

  const trySignin = async() => {
    const signinData = {
      email: inputEmail,
      password: inputPassword
    }
    try{
      const result = await axios.post("http://localhost:3000/auth/sign_in", signinData)
      .then( (res)=>{
        console.log(res);
        if( res.status === 200 ){
          // 認証情報を変数に格納
          const accesstoken = res.headers['access-token'];
          const client = res.headers['client'];
          const uid = res.headers['uid'];

          // ローカルストレージに保存
          localStorage.setItem("access-token", accesstoken);
          localStorage.setItem("client", client);
          localStorage.setItem("uid", uid);

          navigate('/');
          toast({
            title: 'ログイン成功',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
      } );
    } catch(error) {
      console.log(error);
      toast({
        title: "ログイン失敗",
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