import React,{ useState } from 'react'

// redux
import { useDispatch } from "react-redux";
import { asyncSetSession } from '../../store/signinSlice';

// 非同期処理
import axios from "axios";

// route
import { useNavigate } from "react-router-dom";

// styling
import { Box, Input, Button, Heading, Text, useToast } from "@chakra-ui/react";

const Signin = () => {

  // const sessionState = useSelector( (state)=>{ return state.signin } );
  const dispatch = useDispatch();

  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

  const navigate = useNavigate();

  const toast = useToast()

  const trySignin = async() => {
    const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/auth/sign_in`;
    const signinData = {
      email: inputEmail,
      password: inputPassword
    }
    try{
      await axios.post(ENDPOINT, signinData)
      .then( (res)=>{
        console.log(res);
        if( res.status === 200 ){

          // 認証情報を変数に格納
          const accesstoken = res.headers['access-token'];
          const client = res.headers['client'];
          const uid = res.headers['uid'];
          const userId = res.data.data.id;

          // ローカルストレージに保存
          localStorage.setItem("access-token", accesstoken);
          localStorage.setItem("client", client);
          localStorage.setItem("uid", uid);

          // status変更
          const sessionInfo = {
            "access-token":accesstoken,
            "client": client,
            "uid": uid
          }
          dispatch(asyncSetSession(sessionInfo));

          // 遷移設定
          navigate(`/mypage/${userId}`, { state: res.data });

          // toast
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