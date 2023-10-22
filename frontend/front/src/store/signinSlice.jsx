import { createSlice } from "@reduxjs/toolkit";

// 非同期処理
import axios from "axios";

const initState = {
  is_login: false,
  email: "",
  id: "",
  name: "",
  created_at: "",
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
        id: payload.data.id,
        name: payload.data.name,
        created_at: payload.data.created_at,
        team: payload.team
      };
    },
    deleteSession( state, { type, payload } ){
      const newState = {...state};
      return {...newState,
        is_login: false,
        email: "",
        id: "",
        name: "",
        created_at: "",
        team: ""
      }
    }
  }
});

const { setSession, deleteSession } = signinSlice.actions;

const asyncSetSession = (payload) => {
  const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/auth/sessions`;
  return( async( dispatch, getState )=>{
    const result = await axios.get(ENDPOINT, { params: payload })
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
  const ENDPOINT = process.env.REACT_APP_API_LOCAL_ENDPOINT + `/auth/sign_out`;
  return( async( dispatch, getState ) => {
    const result = await axios.delete(ENDPOINT, { params: payload })
    .then( (res)=>{return res.data} );
    dispatch( deleteSession(result) );
  } )
}

export { asyncSetSession, asyncDeleteSession };
export default signinSlice.reducer;