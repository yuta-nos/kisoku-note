import Header from "./components/Header";
import Home from "./components/Home";
import Signin from "./components/auth/Signin";
import TeamPage from "./components/team/TeamPage";
import TeamEdit from "./components/team/TeamEdit";
import Footer from "./components/Footer";

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
        <Route path="/team/:id" element={<TeamPage />} />
        <Route path="/team/:id/edit" element={<TeamEdit />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
