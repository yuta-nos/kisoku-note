import { createSlice } from "@reduxjs/toolkit";

// 非同期処理
import axios from "axios";

const initState = [];

const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {
    getCategory( state, { type, payload } ){
      return [ ...payload ];
    },
    createCategory( state, { type, payload } ){
      const newState = [...state];
      return [ ...newState, payload.data ];
    }
  }
})

const { getCategory, createCategory } = categorySlice.actions;

const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/auth/categories`;

const asyncGetCategory = (payload) => {
  return( async( dispatch, getState )=>{
    const result = await axios.get(ENDPOINT, { params: payload })
    .then( (res)=>{ return res.data } );
    dispatch( getCategory( result.data ) )
  } )
};

const asyncCreateCategory = (payload, sessionData) => {
  return( async( dispatch, getState )=>{
    const result = await axios.post(ENDPOINT, payload, { headers: sessionData })
    .then( (res)=>{ return res.data } );
    dispatch( createCategory( result ) );
  } )
};

export { asyncGetCategory, asyncCreateCategory };
export default categorySlice.reducer;