import { Routes, Route } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Form/Login";
import SignUp from "./Views/Register/SignUp";

function App() {

  return (
    <div>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route path="/login" element={<Form />} />
      <Route path="/signup" element={<SignUp/>} />

    </Routes>
    </div>
  )
}

export default App
