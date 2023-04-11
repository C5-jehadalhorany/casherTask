import Login from './Components/Login';
import { Route, Routes } from "react-router-dom";
import Register from './Components/Register';
import ProductAndHistory from './Components/Product';

function App() {
  
  return (
    <div>
    <Routes>
      <Route path={"/register"} element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProductAndHistory />} />

    
    </Routes>
    </div>
  );
}

export default App;
