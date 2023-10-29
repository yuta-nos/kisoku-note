import { createSlice } from "@reduxjs/toolkit";

// 非同期処理
import axios from "axios";

const initState = [];
  // [
  //   {
  //     id: "",
  //     name: "",
  //     team_id: "",
  //     created_at: "",
  //     updated_at: ""
  //   },
  // ]

const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {
    getCategory( state, { type, payload } ){
      return [ ...payload ];
    },
    createCategory( state, { type, payload } ){
      return [...state, payload];
    },
    deleteCategory( state, { type, payload } ){
      return state.filter( (category)=>{ return category.id !== payload } );
    }
  }
})

const { getCategory, createCategory, deleteCategory } = categorySlice.actions;

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
    dispatch( createCategory( result.data ) );
  } )
};

const asyncDeleteCategory = (payload, sessionData) => {
  return( async( dispatch, getState )=>{
    await axios.delete(`${ENDPOINT}/${payload}`, { headers: sessionData })
    .then( (res)=>{ return res.data } );
    dispatch( deleteCategory( payload ) );
  } );
}

export { asyncGetAllCategories, asyncCreateCategory, asyncDeleteCategory };
export default categorySlice.reducer;