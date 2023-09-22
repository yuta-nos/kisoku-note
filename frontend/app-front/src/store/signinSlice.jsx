import { createSlice } from "@reduxjs/toolkit";

const initState = false;

const signinSlice = createSlice({
  name: "isSignedIn",
  initialState: initState,
  reducers: {
    setTrue(state, {type, payload}){
      return true;
    },
    setFalse(state, {type, payload}){
      return false
    }
  }
});

const { setTrue, setFalse } = signinSlice.actions;

export { setTrue, setFalse };
export default signinSlice.reducer;