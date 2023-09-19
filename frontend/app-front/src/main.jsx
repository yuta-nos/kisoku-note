import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// redux
import { Provider } from "react-redux";
import { store } from "./store/index";

// router
import { BrowserRouter } from "react-router-dom";

// styling
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
