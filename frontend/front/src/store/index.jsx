import { configureStore } from "@reduxjs/toolkit";

import teamReducer from "./teamSlice";
import signinReducer from "./signinSlice";
import categoryReducer from "./categorySlice";

const store = configureStore({
  reducer: {
    team: teamReducer,
    signin: signinReducer,
    category: categoryReducer,
  }
})

export { store }