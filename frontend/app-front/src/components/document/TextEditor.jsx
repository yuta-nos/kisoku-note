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
import { Box, Button, HStack, Input, Textarea } from "@chakra-ui/react";
import {
  useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

const TextEditor = ({location}) => {

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const params = useParams();
  // console.log(params)

  const navigate = useNavigate();

  // どのページに属しているエディタなのかを判定するために必要な値
  // console.log(location);

  const [verID, setVerID] = useState();

  // 文書データ取得用
  useEffect( ()=>{
    const getDocContent = async() => {
      axios.get(`http://localhost:3000/auth/documents/${params.id}`)
      .then( (res)=>{
        console.log(res.data)
        const raw = res.data.versions[0].body;
        const title = res.data.title;
        console.log(raw);
        console.log(title);
        const contentState = convertFromRaw(JSON.parse(raw));
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
        setInputTitle(title);
        setVerID(res.data.versions[0].id);
      } );
    }
    if(location.pathname !== "/new-document"){
      // 新規作成ページではない場合
      getDocContent();
    } else {
      // 新規作成ページの場合
      setReadOnly(false);
    }
  }, [] )

  // logined_user取得（後でauthorを付与するため）
  const user = useSelector( (state)=>{ return state.signin } );
  // console.log(user);
  
  // 文書保存
  const saveContent = async() => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const jsonData = JSON.stringify(raw, null, 2);
    // console.log(jsonData);
    const ID = UUID.generate();
    // console.log(ID);
    await axios.post("http://localhost:3000/auth/documents", {
      "doc_num": ID,
      "title": inputTitle,
      // "body": jsonData,
      "category_id": location.state.category,
      // "version": 1,
      // "reason": "新規作成"
    }).then( (res)=>{
      console.log("documents:", res.data);
      // ここでversionのデータを作成
      axios.post("http://localhost:3000/auth/versions", {
        "document_id": res.data.data.id,
        "number": 1,
        "body": jsonData,
        "reason": "新規作成"
      }).then( (res)=>{
        console.log("versions:",res.data);
        navigate(`/team/${user.team.id}/category/${location.state.category}`);
      } );
    } );
  }

  // 文書更新
  const updateContent = async() => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const jsonData = JSON.stringify(raw, null, 2);
    await axios.put(`http://localhost:3000/auth/documents/${params.id}`,{
      "title": inputTitle
      // "body": jsonData
    }).then( (res)=>{
      console.log(res.data)
      axios.put(`http://localhost:3000/auth/versions/${verID}`,{
        "body": jsonData
      })
      setReadOnly(true);
    } )
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  // // バージョン更新
  // const updateVersion = async() => {
  //   // console.log(versionUpReason);
  //   const contentState = editorState.getCurrentContent();
  //   const raw = convertToRaw(contentState);
  //   const jsonData = JSON.stringify(raw, null, 2);
  //   await axios.post(`http://localhost:3000/auth/documents`,{
  //     "doc_num": params.id,
  //     "title": inputTitle,
  //     "body": jsonData,
  //     "category_id": location.state.category_id,
  //     "version": verNum + 1,
  //     "reason": versionUpReason
  //   }).then( (res)=>{ console.log(res.data) } )
  // }

  const toggleBold = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }
  const toggleItalic = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
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

  const [inputTitle, setInputTitle] = useState("");

  const [versionUpReason, setVersionUpReason] = useState();

  const [ readOnly, setReadOnly ] = useState(true);

  return (
    <Box>
      { readOnly ? 
        <Button my={5} onClick={ ()=>{ setReadOnly( !readOnly ) } }>編集する</Button>
      :
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
                onClick={ ()=>{ setReadOnly(true) } }
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
                  // onClick={updateVersion}
                >バージョン更新</Button>
                <Button onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <HStack spacing="3px">
            <Button
              onClick={toggleBold}
              borderRadius="10px 0 0 10px"
              fontSize="0.8em"
            >太字</Button>
            <Button
              onClick={toggleItalic}
              borderRadius="0"
              fontSize="0.7em"
            >イタリック</Button>
            <Button
                onClick={toggleH5}
                borderRadius="0 10px 10px 0"
                style={{textDecoration:"underline"}}
                fontSize="0.8em"
              >下線</Button>
          </HStack>
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
        </HStack>
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