import { configureStore } from "@reduxjs/toolkit";

import teamReducer from "./teamSlice";
import signinReducer from "./signinSlice";

const store = configureStore({
  reducer: {
    team: teamReducer,
    signin: signinReducer,
  }
})

export { store }