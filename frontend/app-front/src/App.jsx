import Header from "./components/Header";
import Home from "./components/Home";
import Signin from "./components/auth/Signin";

// router
import { Routes, Route } from "react-router-dom";

// styling
import { Box } from "@chakra-ui/react"

const App = () => {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App
