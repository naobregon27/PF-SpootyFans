import { Routes, Route } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Form/Login";
import Form_song from "./Views/Form_song/Form_song";

function App() {

  return (
    <div>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route path="/login" element={<Form />} />
      <Route pathe="/create" element={<Form_song/>}/>

    </Routes>
    </div>
  )
}

export default App
