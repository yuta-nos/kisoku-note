import Header from "./components/Header";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Mypage from "./components/auth/Mypage";
import TeamPage from "./components/team/TeamPage";
import TeamEdit from "./components/team/TeamEdit";
import Footer from "./components/Footer";

// router
import { Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/mypage/:id" element={<Mypage />} />
        <Route path="/team/:id" element={<TeamPage />} />
        <Route path="/team/:id/edit" element={<TeamEdit />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
