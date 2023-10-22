import { createSlice } from "@reduxjs/toolkit";

// 非同期処理
import axios from "axios";

const initState = {
  name: "init",
  users: [
    {
      uid: "",
      name: ""
    }
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
    }
  }
});

const { get, create, updateName } = teamSlice.actions;

const asyncGetTeam = (payload) => {
  const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/teams/${payload.id}`;
  return( async(dispatch, getState)=>{
    const result = await axios.get(ENDPOINT, {
      params: {
        "access-token": payload.accesstoken,
        "client": payload.client,
        "uid": payload.uid
      }
    })
    .then( (res)=>{ return res.data } );
    dispatch( get(result) );
  } );
};

const asyncCreateTeam = () => {
  const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/teams`;
  return( async(dispatch, getState)=>{
    const result = await axios.post(ENDPOINT)
    .then( (res)=>{ return res.data } );
    dispatch( create(result) )
  } );
};

const asyncUpdateTeamName = (payload) => {
  const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/teams/${payload.id}`;
  return( async(dispatch, getState)=>{
    const result = await axios.put(ENDPOINT, { name: payload.name})
    .then( (res)=>{ return res.data } );
    dispatch( updateName(result) );
  } )
}

export { asyncGetTeam, asyncCreateTeam, asyncUpdateTeamName };
export default teamSlice.reducer;