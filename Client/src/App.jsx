import { Routes, Route } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Login/Login";
import Home from "./Views/Home/Home";
import SignUp from "./Views/Register/SignUp";
import Form_song from "./Views/Form_song/Form_song";

function App() {

  return (
    <div>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route path="/login" element={<Form />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route pathe="/create" element={<Form_song/>}/>

    </Routes>
    </div>
  )
}

export default App
