import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// redux
import { Provider } from "react-redux";
import { store } from "./store/index";

// router
import { BrowserRouter } from "react-router-dom";

// styling
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      h1: {
        fontSize: "2em",
        fontWeight: "bold"
      },
      h2: {
        fontSize: "1.5em",
        fontWeight: "bold"
      },
      h3: {
        fontSize: "1.17em",
        fontWeight: "bold"
      },
      h4: {
        fontWeight: "bold"
      },
      h5: {
        fontSize: "0.83em",
        fontWeight: "bold"
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
