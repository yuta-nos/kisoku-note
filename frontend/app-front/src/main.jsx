import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// router
import { BrowserRouter } from "react-router-dom";

// styling
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
