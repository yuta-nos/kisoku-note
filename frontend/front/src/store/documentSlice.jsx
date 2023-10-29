import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initState = {
  id: "",
  name: "",
  documents: [
    {
        id: "",
        doc_num: "",
        title: "",
        body: "",
        category_id: "",
        version: "",
        reason: "",
        created_at: "",
        updated_at: ""
    }
  ],
  versions: [
    {
      id: "",
      document_id: "",
      body: "",
      created_at: "",
      updated_at: "",
      number: ""
    }
  ]

}

const documentSlice = createSlice({
  name: "document",
  initialState: initState,
  reducers: {
    get( state, { type, payload } ){
      return payload;
    },
    deleteDoc( state, { type, payload } ){
      const newDocState = state.documents.filter( ( doc )=> doc.id !== payload );
      const newState = { ...state, documents: newDocState };
      return newState;
    }
  }
});

const { get, deleteDoc } = documentSlice.actions;

// カテゴリ一覧のデータ取得
const asyncGetDocsInThisCat = (payload, sessionData) => {
  const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/categories/${payload}`;
  return( async(dispatch, getState)=>{
    const result = await axios.get(ENDPOINT, { headers: sessionData } )
    .then( (res) => { return res.data } );
    dispatch( get(result) );
  } );
};

// カテゴリ一覧から文書を削除
const asyncDeleteDocsInThisCat = (payload, sessionData) => {
  const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/documents/${payload}`;
  return( async(dispatch, getState) => {
    await axios.delete( ENDPOINT, { headers: sessionData } );
    dispatch( deleteDoc(payload) );
  } );
}

export { asyncGetDocsInThisCat, asyncDeleteDocsInThisCat };
export default documentSlice.reducer;