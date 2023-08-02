import { Routes, Route } from "react-router-dom";
import Landing from "./Views/Landing/Landing";

function App() {

  return (
    <div>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
    </Routes>
    </div>
  )
}

export default App
