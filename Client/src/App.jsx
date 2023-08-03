import { Routes, Route } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Login/Login";
import Home from "./Views/Home/Home";
import SignUp from "./Views/Register/SignUp";
import Form_song from "./Views/Form_song/Form_song";
import Detail from "./Views/Detail/Detail";

function App() {

  return (
    <div>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route path="/login" element={<Form />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create" element={<Form_song/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
    </Routes>
    </div>
  )
}

export default App
