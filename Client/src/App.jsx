import { Routes, Route } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Form/Login";

function App() {

  return (
    <div>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route path="/login" element={<Form />} />

    </Routes>
    </div>
  )
}

export default App
