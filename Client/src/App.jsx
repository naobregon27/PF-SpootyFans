import { Routes, Route } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Form/Login";
import Form_song from "./Views/Form_song/Form_song";
import Detail from "./Views/Detail/Detail";
import Home from "./Views/Home/Home";

function App() {

  return (
    <div>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route path="/login" element={<Form />} />
      <Route path="/create" element={<Form_song/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
    </Routes>
    </div>
  )
}

export default App
