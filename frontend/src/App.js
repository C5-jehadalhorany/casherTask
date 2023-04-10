import Login from './Components/Login';
import { Route, Routes } from "react-router-dom";
import Register from './Components/Register';


function App() {
  
  return (
    <div>
    <Routes>
      <Route path={"/register"} element={<Register />} />
      <Route path="/login" element={<Login/>} />
    
    </Routes>
    </div>
  );
}

export default App;
