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
  return( async(dispatch, getState)=>{
    const result = await axios.get(`http://localhost:3000/auth/teams/${payload.id}`, {
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
  return( async(dispatch, getState)=>{
    const result = await axios.post("http://localhost:3000/auth/teams")
    .then( (res)=>{ return res.data } );
    dispatch( create(result) )
  } );
};

const asyncUpdateTeamName = (payload) => {
  return( async(dispatch, getState)=>{
    const result = await axios.put(`http://localhost:3000/teams/${payload.id}`, { name: payload.name})
    .then( (res)=>{ return res.data } );
    dispatch( updateName(result) );
  } )
}

export { asyncGetTeam, asyncCreateTeam, asyncUpdateTeamName };
export default teamSlice.reducer;