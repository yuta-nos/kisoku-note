import { createSlice } from "@reduxjs/toolkit";

// 非同期処理
import axios from "axios";

const initState = {
  categories: [
    // {
    //   id: "",
    //   name: "",
    //   team_id: "",
    //   created_at: "",
    //   updated_at: ""
    // }
  ],
  name: "init",
  users: [
    {
      uid: "",
      name: ""
    }
  ],
  documents: [

  ]
}

const teamSlice = createSlice({
  name: "team",
  initialState: initState,
  reducers: {
    get( state, { type, payload } ){
      return {...payload}
    },
    create( state, { type, payload } ){
      return {...payload}
    },
    updateName(state, { type, payload }){
      return {...state, name: payload.name}
    },
    createCategoryFromTeam( state, { type, payload } ){
      return {...state, categories: [ ...state.categories, payload ]}
    },
    deleteCategoryFromTeam( state, { type, payload }){
      const newCategories = state.categories.filter( (category) => { return category.id !== payload } );
      return { ...state, categories: newCategories }
    }
  }
});

const { get, create, updateName, createCategoryFromTeam, deleteCategoryFromTeam } = teamSlice.actions;

const asyncGetTeam = (payload) => {
  const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/auth/teams/${payload.id}`;
  return( async(dispatch, getState)=>{
    const result = await axios.get(ENDPOINT, {
      headers: {
        "access-token": payload.accesstoken,
        "client": payload.client,
        "uid": payload.uid
      }
    }).then( (res)=>{ console.log("ここ"); return res.data } );
    dispatch( get(result) );
  } );
};

const asyncCreateTeam = () => {
  const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/auth/teams`;
  return( async(dispatch, getState)=>{
    const result = await axios.post(ENDPOINT)
    .then( (res)=>{ return res.data } );
    dispatch( create(result) )
  } );
};

const asyncUpdateTeamName = (payload) => {
  const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/auth/teams/${payload.id}`;
  return( async(dispatch, getState)=>{
    const result = await axios.put(ENDPOINT, { name: payload.name }, { headers: {
      "access-token": payload.accesstoken,
      "client": payload.client,
      "uid": payload.uid
    } })
    .then( (res)=>{ return res.data } );
    dispatch( updateName(result) );
  } )
}

const asyncCreateCategoryFromTeam = (payload, sessionData) => {
  const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/categories`;
  return( async( dispatch, getState )=>{
    const result = await axios.post(ENDPOINT, payload, { headers: sessionData })
    .then( (res)=>{ return res.data } );
    dispatch( createCategoryFromTeam( result.data ) );
  } );
};

const asyncDeleteCategoryFromTeam = (payload, sessionData) => {
  const ENDPOINT = `${process.env.REACT_APP_API_LOCAL_ENDPOINT}/auth/categories`;
  return( async( dispatch, getState )=>{
    await axios.delete(`${ENDPOINT}/${payload}`, { headers: sessionData })
    .then( (res)=>{ return res.data } );
    dispatch( deleteCategoryFromTeam( payload ) );
  } );
}

export { asyncGetTeam, asyncCreateTeam, asyncUpdateTeamName, asyncCreateCategoryFromTeam, asyncDeleteCategoryFromTeam };
export default teamSlice.reducer;