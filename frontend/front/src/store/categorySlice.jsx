import { createSlice } from "@reduxjs/toolkit";

// 非同期処理
import axios from "axios";

const initState = 
  [
    {
      id: "",
      name: "",
      team_id: "",
      created_at: "",
      updated_at: ""
    }
  ];

const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {
    getCategory( state, { type, payload } ){
      return payload;
    },
    createCategory( state, { type, payload } ){
      const newState = [...state];
      return [ ...newState, payload.data ];
    }
  }
})

const { getCategory, createCategory } = categorySlice.actions;

const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/categories`;

const asyncGetAllCategories = (sessionData) => {
  return( async( dispatch, getState )=>{
    const result = await axios.get(ENDPOINT, { headers: sessionData })
    .then( (res)=>{ return res.data } );
    dispatch( getCategory( result.data ) );
  } )
}

const asyncCreateCategory = (payload, sessionData) => {
  return( async( dispatch, getState )=>{
    const result = await axios.post(ENDPOINT, payload, { headers: sessionData })
    .then( (res)=>{ return res.data } );
    dispatch( createCategory( result ) );
  } )
};

export { asyncGetAllCategories, asyncCreateCategory };
export default categorySlice.reducer;