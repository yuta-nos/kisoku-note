import React, { useState, useEffect } from 'react'

// draft
import { Editor, EditorState, convertToRaw, convertFromRaw,  RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

// redux
import { useSelector } from "react-redux";

// route
import { useParams, useNavigate } from 'react-router-dom';

// 非同期処理
import axios from 'axios';

// uuid
import { UUID } from "uuidjs";

// styling
import { Box, Button, HStack, Input, Textarea, Wrap, WrapItem } from "@chakra-ui/react";
import {
  useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

const TextEditor = ({location}) => {

  // draft.js
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const params = useParams();
  // console.log(params)

  const navigate = useNavigate();

  // どのページに属しているエディタなのかを判定するために必要な値
  // console.log(location);

  // logined_user取得（後でauthorを付与するため）
  const user = useSelector( (state)=>{ return state.signin } );
  // console.log(user);

  const [docData, setDocData] = useState();

  // session取得
  const sessionData = {
    "access-token": localStorage.getItem("access-token"),
    "client": localStorage.getItem("client"),
    "uid": localStorage.getItem("uid")
  };

  // 文書データ取得用
  useEffect( ()=>{
    const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/documents/${params.id}`;
    const getDocContent = async() => {
      await axios.get(ENDPOINT, { headers: sessionData })
      .then( (res)=>{
        const raw = res.data.versions[params.version - 1].body;
        const title = res.data.title;
        const contentState = convertFromRaw(JSON.parse(raw));
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
        setInputTitle(title);
        setDocData(res.data);
      } );
    };

    if(location.pathname !== "/new-document"){
      // 新規作成ページではない場合
      getDocContent();
    } else {
      // 新規作成ページの場合
      setReadOnly(false);
    }
  }, [] )
  
  // 文書保存
  const saveContent = async() => {

    //documentデータ作成
    const contentState = editorState.getCurrentContent();
    console.log(contentState);
    const raw = convertToRaw(contentState);
    console.log(raw)
    const jsonData = JSON.stringify(raw, null, 2);
    console.log(jsonData)
    const ID = UUID.generate();

    const ENDPOINT1 = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/documents`;
    await axios.post(ENDPOINT1, {
      "doc_num": ID,
      "title": inputTitle,
      "category_id": location.state.category,
    }, { headers: sessionData })
    .then( (res)=>{
      //versionデータ作成
      console.log("documents:", res.data.data);
      const category_id = res.data.data.category_id;

      const ENDPOINT2 = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/versions`;
      const postedVerData = axios.post(ENDPOINT2, {
        "document_id": res.data.data.id,
        "number": 1,
        "body": jsonData,
        "reason": "新規作成"
      }, { headers: sessionData })
      console.log("versions:",postedVerData.data);
      navigate(`/team/${user.team.id}/category/${category_id}`);
    } )

    
  }


  // 文書更新
  const updateContent = async() => {

    // 文書タイトルの更新
      try {
        const ENDPOINT1 = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/documents/${params.id}`;
        const response1 = await axios.put(ENDPOINT1, {
          "title": inputTitle
        }, { headers: sessionData });
    
        console.log("更新対象バージョン", response1.data.versions[params.version - 1].id);
    
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        const jsonData = JSON.stringify(raw, null, 2);
    
        const ENDPOINT2 = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/versions/${response1.data.versions[params.version - 1].id}`;
        const response2 = await axios.patch(ENDPOINT2, {
          "body": jsonData
        }, { headers: sessionData });
    
        console.log("更新後データ", response2.data);
    
        // 編集モード終了
        setReadOnly(true);
      } catch (error) {
        console.log("エラー発生：", error);
      }
    };      

  const { isOpen, onOpen, onClose } = useDisclosure();

  // // バージョン更新
  const updateVersion = async() => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const jsonData = JSON.stringify(raw, null, 2);

    const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/versions`;
    await axios.post(ENDPOINT,{
      "document_id": docData.id,
      "body": jsonData,
      "number": parseInt(params.version) + 1,
      "reason": versionUpReason
    }, { headers: sessionData }).then( (res)=>{
      console.log(res.data);
      navigate(`/team/${user.team.id}/category/${docData.category.id}`)
    } )
  }

  const toggleBold = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }
  const toggleItalic = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  }
  const toggleUnderline = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  }
  const toggleH1 = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
  }
  const toggleH2 = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
  }
  const toggleH3 = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "header-three"));
  }
  const toggleH4 = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "header-four"));
  }
  const toggleH5 = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "header-five"));
  }
  const toggleUl = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
  };
  const togglOl = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };


  const [inputTitle, setInputTitle] = useState("");

  const [versionUpReason, setVersionUpReason] = useState();

  const [ readOnly, setReadOnly ] = useState(true);

  return (
    <Box>
      { readOnly ? 
        <Button my={5} onClick={ ()=>{ setReadOnly( !readOnly ) } }>編集する</Button>
      :
        <Box>
          <HStack my={5}>
            { location.pathname === "/new-document" ?
              <Button
                onClick={saveContent}
                bgColor="red.100"
              >保存</Button>
            :
              <HStack spacing="3px">
                <Button
                  onClick={updateContent}
                  bgColor="red.100"
                  borderRadius="10px 0 0 10px"
                >更新</Button>
                <Button
                  onClick={ onOpen }
                  bgColor="red.100"
                  borderRadius={0}
                >Ver.更新</Button>
                <Button
                  onClick={ ()=>{
                    setReadOnly(true);
                    navigate(`/team/${user.team.id}/category/${docData.category.id}`)
                  } }
                  borderRadius="0 10px 10px 0"
                >完了</Button>
              </HStack>
            }
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>更新理由</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Textarea
                    placeholder='ここに更新理由を記載'
                    height="300px"
                    onChange={ (e)=>{ setVersionUpReason(e.target.value) } }
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    mr={3} colorScheme="red"
                    onClick={updateVersion}
                  >バージョン更新</Button>
                  <Button onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </HStack>
          <Wrap mb={5}>
            <WrapItem>
            <HStack spacing="3px">
              <Button
                onClick={toggleBold}
                borderRadius="10px 0 0 10px"
                fontSize="0.7em"
              >太字</Button>
              <Button
                onClick={toggleItalic}
                borderRadius="0"
                fontSize="0.7em"
              >イタリック</Button>
              <Button
                  onClick={toggleUnderline}
                  borderRadius="0 10px 10px 0"
                  style={{textDecoration:"underline"}}
                  fontSize="0.7em"
                >下線</Button>
            </HStack>
            </WrapItem>

            <WrapItem>
            <HStack spacing="3px">
              <Button
                onClick={toggleUl}
                fontSize="0.7em"
                borderRadius="10px 0 0 10px"
              >箇条書き</Button>
              <Button
                onClick={togglOl}
                fontSize="0.7em"
                borderRadius="0 10px 10px 0"
              >番号</Button>
            </HStack>
            </WrapItem>

            <WrapItem>
            <HStack spacing="3px">
              <Button
                onClick={toggleH1}
                borderRadius="10px 0 0 10px"
              >H1</Button>
              <Button
                onClick={toggleH2}
                borderRadius={0}
              >H2</Button>
              <Button
                onClick={toggleH3}
                borderRadius={0}
              >H3</Button>
              <Button
                onClick={toggleH4}
                borderRadius={0}
              >H4</Button>
              <Button
                onClick={toggleH5}
                borderRadius="0 10px 10px 0"
              >H5</Button>
            </HStack>
            </WrapItem>
          </Wrap>
        </Box>
      }
      <Input
        fontSize="xl"
        fontWeight="bold"
        py={6} mb={5}
        placeholder='タイトル'
        value={inputTitle}
        onChange={(e)=>{ setInputTitle(e.target.value) }}
        readOnly={readOnly}
      />
      <Box
        mb={5} p={3} minH="300px"
        height="80vh" overflow="scroll" //　document量が多い場合はスクロール
        border="1px" borderColor="gray.200" borderRadius={5}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="ここから入力"
          readOnly={readOnly}
        />
      </Box>
    </Box>
  )
}

export default TextEditor