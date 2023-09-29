import React, { useState, useEffect } from 'react'

// draft
import { Editor, EditorState, convertToRaw, convertFromRaw,  RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

// redux
import { useSelector } from "react-redux";

// route
import { useParams } from 'react-router-dom';

// 非同期処理
import axios from 'axios';

// uuid
import { UUID } from "uuidjs";

// styling
import { Box, Button, Heading, HStack, Input } from "@chakra-ui/react";

const TextEditor = ({location}) => {

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const params = useParams();
  // console.log(params)

  // どのページに属しているエディタなのかを判定するために必要な値
  // console.log(location);

  // 文書データ取得用（新規作成時は適用しない）
  useEffect( ()=>{
    const getDocContent = async() => {
      axios.get(`http://localhost:3000/auth/documents/${params.id}`)
      .then( (arry)=>{
        const raw = arry.data.data[0].body;
        const title = arry.data.data[0].title;
        console.log(raw);
        console.log(title);
        const contentState = convertFromRaw(JSON.parse(raw));
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
        setInputTitle(title);
      } );
    }
    if(location.pathname !== "/new-document"){
      getDocContent();
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
    console.log(jsonData);
    const ID = UUID.generate();
    console.log(ID);
    await axios.post("http://localhost:3000/auth/documents", {
      "doc_num": ID,
      "title": inputTitle,
      "body": jsonData,
      "category_id": location.state.category,
      "version": 1,
      "reason": "新規作成"
    }).then( (res)=>{ console.log(res.data); return res.data; } );
  }

  // 文書更新
  const updateContent = async() => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const jsonData = JSON.stringify(raw, null, 2);
    await axios.put(`http://localhost:3000/auth/documents/${params.id}`,{
      "title": inputTitle,
      "body": jsonData
    })
  }

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

  return (
    <Box maxW="750px" my={6} mx="auto" p={3} >
      <Input placeholder='タイトル' value={inputTitle} onChange={(e)=>{ setInputTitle(e.target.value) }} />
      <HStack mt={5}>
        { location.pathname === "/new-document" ?
          <Button
            onClick={saveContent}
            borderRadius="10px 10px 0 0"
            bgColor="red.100"
          >保存</Button>
        :
          <Button
            onClick={updateContent}
            borderRadius="10px 10px 0 0"
            bgColor="red.100"
          >更新</Button>
        }
        
        <Button
          onClick={toggleBold}
          borderRadius="10px 10px 0 0"
        >太字</Button>
        <Button
          onClick={toggleItalic}
          borderRadius="10px 10px 0 0"
        >イタリック</Button>
        <Button
          onClick={toggleH1}
          borderRadius="10px 10px 0 0"
          bgColor="blue.100"
        >H1</Button>
        <Button
          onClick={toggleH2}
          borderRadius="10px 10px 0 0"
          bgColor="blue.100"
        >H2</Button>
        <Button
          onClick={toggleH3}
          borderRadius="10px 10px 0 0"
          bgColor="blue.100"
        >H3</Button>
        <Button
          onClick={toggleH4}
          borderRadius="10px 10px 0 0"
          bgColor="blue.100"
        >H4</Button>
        <Button
          onClick={toggleH5}
          borderRadius="10px 10px 0 0"
          bgColor="blue.100"
        >H5</Button>
      </HStack>
      <Box
        mb={5} p={3} minH="300px"
        border="1px" borderColor="gray.200" borderRadius={5}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="ここから入力"
        />
      </Box>
    </Box>
  )
}

export default TextEditor