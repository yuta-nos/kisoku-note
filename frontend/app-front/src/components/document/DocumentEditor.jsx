import React, { useState } from 'react'

// draft
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

// styling
import { Box, Button, Heading, HStack, Input } from "@chakra-ui/react";

const DocumentEditor = () => {

  

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  
  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    // const jsonData = JSON.stringify(raw, null, 2);
    console.log(raw);
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

  function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'header-one') {
    return 'header1'
  }
}

  return (
    <Box maxW="750px" my={12} mx="auto" p={3} >
      <Heading as="h3" size="md" mb={5}>文書</Heading>
      <Input placeholder='タイトル' />
      <HStack mt={5}>
        <Button
          onClick={saveContent}
          borderRadius="10px 10px 0 0"
          bgColor="red.100"
        >保存</Button>
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
          blockStyleFn={myBlockStyleFn}
        />
      </Box>
    </Box>
  )
}

export default DocumentEditor