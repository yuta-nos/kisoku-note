import { createSlice } from "@reduxjs/toolkit";

// 非同期処理
import axios from "axios";

const initState = {
  is_login: false,
  email: "",
  name: "",
  team_name: ""
};

const signinSlice = createSlice({
  name: "sessionStatus",
  initialState: initState,
  reducers: {
    setSession( state, { type, payload } ){
      const newState = {...state};
      return {...newState,
        is_login: payload.is_login,
        email: payload.data.email,
        name: payload.data.name,
        team_name: payload.team.name
      };
    },
    deleteSession( state, { type, payload } ){
      const newState = {...state};
      return {...newState,
        is_login: false,
        email: "",
        name: "",
        team_name: ""
      }
    }
  }
});

const { setSession, deleteSession } = signinSlice.actions;

const asyncSetSession = (payload) => {
  return( async( dispatch, getState )=>{
    const result = await axios.get("http://localhost:3000/auth/sessions", { params: payload })
    .then( (res)=>{ return res.data } );
    if( result.is_login === false ){
      dispatch( setSession( {
        is_login: result.is_login,
        data: {
          email: "",
          name: ""
        },
        team: {
          name: ""
        }
      } ) )
    } else {
      dispatch( setSession(result) );
    }
  } );
}
const asyncDeleteSession = (payload) => {
  return( async( dispatch, getState ) => {
    const result = await axios.delete("http://localhost:3000/auth/sign_out", { params: payload })
    .then( (res)=>{return res.data} );
    dispatch( deleteSession(result) );
  } )
}

export { asyncSetSession, asyncDeleteSession };
export default signinSlice.reducer;